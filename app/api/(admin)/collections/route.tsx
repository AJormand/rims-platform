import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import fs from "fs";
import { exec } from "child_process";
import path from "path";

export async function POST(request: Request) {
  const { collectionName, schemaDefinition } = await request.json();

  if (!collectionName || !schemaDefinition) {
    return new NextResponse(
      "Collection name and schema definition are required",
      { status: 400 }
    );
  }

  try {
    // Add the new model to schema.prisma
    const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
    let schemaContent = fs.readFileSync(schemaPath, "utf8");

    const newModel = `

model ${collectionName} {${schemaDefinition}
}`;

    schemaContent += newModel;

    fs.writeFileSync(schemaPath, schemaContent, "utf8");

    // Run prisma generate to apply changes
    exec("npx prisma db push", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running prisma generate: ${stderr}`);
      }
      console.log(`Prisma generate output: ${stdout}`);
      return new NextResponse("Collection created!", { status: 200 });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function GET(request: Request) {
  console.log("Get collections");

  //console.log(schemaContent)
  try {
    const collections = await db.$runCommandRaw({
      listCollections: 1,
    });

    return NextResponse.json(collections);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET COLLECTIONS]", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { collectionName } = await request.json();
  console.log(collectionName);
  console.log("Delete collection");
  const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
  let schemaContent = fs.readFileSync(schemaPath, "utf8");

  try {
    const response = await db.$runCommandRaw({
      drop: collectionName,
    });

    console.log(response);
    //update prisma schema
    if (response.ok === 1) {
      const modelRegex = new RegExp(
        `model ${collectionName} \\{[^\\}]*\\}\\n*`,
        "g"
      );
      console.log(modelRegex);
      schemaContent = schemaContent.replace(modelRegex, "");
      console.log(schemaContent);
      fs.writeFileSync(schemaPath, schemaContent, "utf8");
    }
    console.log(`Collection '${collectionName}' dropped successfully`);
    return new NextResponse(`Collection ${collectionName} deleted!`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
