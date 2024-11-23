import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { db } from "@/lib/db";
import { custom } from "zod";

export async function GET() {
  const userId = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const customObjectTemplates = await db.customObjectsTemplates.findMany();

    return NextResponse.json(customObjectTemplates);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET TEMPLATE]", { status: 400 });
  }
}

export async function POST(request: Request) {
  const userId = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const receivedData = await request.json();

  const defaultAttributes = [
    { name: "name", type: "string", required: true, customAttribute: false },
    { name: "status", type: "string", required: true, customAttribute: false },
  ];

  try {
    const newTemplate = await db.customObjectsTemplates.create({
      data: {
        name: receivedData.name,
        attributes: defaultAttributes,
        status: "Active",
      }
    })
    

    return NextResponse.json(newTemplate);
  } catch (error) {
    console.log(error);
    return new NextResponse("[CREATE TEMPLATE]", { status: 400 });
  }
}
