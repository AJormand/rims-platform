import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function GET(
  request: Request,
  { params }: { params: { collectionName: string } }
) {
  const { collectionName } = params;

  console.log({ collectionName });

  try {
    const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
    let schemaContent = fs.readFileSync(schemaPath, "utf8");

    const modelRegex = new RegExp(
      `model ${collectionName} \\{[^\\}]*\\}\\n*`,
      "g"
    );
    const modelMatches = schemaContent.match(modelRegex);
    console.log({ modelMatches });

    if (!modelMatches)
      return new NextResponse("[GET COLLECTION]", { status: 400 });

    return new NextResponse(modelMatches[0], { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET COLLECTION]", { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { collectionName: string } }
) {
  const { collectionName } = params;

  try {
    const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
    let schemaContent = fs.readFileSync(schemaPath, "utf8");

    // Get the new model content from the request body
    const body = await request.json();
    const { updatedModel } = body;

    console.log(updatedModel);

    if (!updatedModel) {
      return new NextResponse("No model content provided", { status: 400 });
    }

    // Regex to find the existing model in the schema
    const modelRegex = new RegExp(
      `model ${collectionName} \\{[^\\}]*\\}\\n*`,
      "g"
    );
    const modelMatches = schemaContent.match(modelRegex);

    if (!modelMatches)
      return new NextResponse("[GET COLLECTION]", { status: 400 });

    // Replace the existing model with the new content
    schemaContent = schemaContent.replace(modelRegex, updatedModel);

    // Save the updated schema back to the file
    fs.writeFileSync(schemaPath, schemaContent, "utf8");

    // Run prisma generate to apply changes
    await execAsync("npx prisma format");
    await execAsync("npx prisma db push");
    return new NextResponse("Model updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("[UPDATE COLLECTION]", { status: 400 });
  }
}
