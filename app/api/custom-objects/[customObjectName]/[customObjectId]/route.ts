import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: { customObjectName: string; customObjectId: string } }
) {
  const { customObjectName, customObjectId } = params;
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = await client.db("rims-platform");
    const collection = db.collection("Codes");

    const data = await collection.findOne({
      _id: new ObjectId(customObjectId),
    });

    if (!data) {
      return new NextResponse("Document not found", { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log("Error fetching custom objectIds data", error);
    return new NextResponse("[GET CUSTOM OBJECT ID DATA]", { status: 400 });
  }
}

/*
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { customObjectName: string; customObjectId: string };
  }
) {
  const { customObjectName, customObjectId } = params;

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Type assertion to inform TypeScript that we are accessing a Prisma model
    const model = db[customObjectName as keyof PrismaClient] as any;
    if (typeof model.findMany !== "function") {
      return new NextResponse("Invalid model name", { status: 400 });
    }

    const customObject = await model.findUnique({
      where: {
        id: customObjectId,
      },
    });

    return NextResponse.json(customObject);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET ORGANIZATION]", { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { customObjectName: string; customObjectId: string } }
) {
  const { customObjectName, customObjectId } = params;
  const { values } = await request.json();
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const model = db[customObjectName as keyof PrismaClient] as any;
    if (!model || typeof model.update !== "function") {
      return new NextResponse(`Model ${customObjectName} not found`, {
        status: 400,
      });
    }

    await model.update({
      where: {
        id: customObjectId,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse(`${customObjectName} updated successfully`, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(`[UPDATE ${customObjectName}]`, { status: 400 });
  }
}


*/
