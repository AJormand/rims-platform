import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
//import { db } from "@/lib/db";
//import { PrismaClient } from "@prisma/client";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  console.log("-----------------GET CUSTOM OBJECTS----------------");

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = await client.db();

    const collection = db.collection("CustomObjects");
    const customObjectData = await collection.find({}).toArray();

    return NextResponse.json(customObjectData);
  } catch (error) {
    console.error("Error fetching custom object data:", error);
    return new NextResponse("[GET CUSTOM OBJECT DATA]", { status: 400 });
  }
}

/*
export async function GET(
  request: Request,
  { params }: { params: { customObjectName: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { customObjectName } = params;

  try {
    // Type assertion to inform TypeScript that we are accessing a Prisma model
    const model = db[customObjectName as keyof PrismaClient] as any;
    if (typeof model.findMany !== "function") {
      return new NextResponse("Invalid model name", { status: 400 });
    }

    const customObjectData = await model.findMany({});
    return NextResponse.json(customObjectData);
  } catch (error) {
    return new NextResponse("[GET CUSTOM OBJECT DATA]", { status: 400 });
  }
}
*/
