import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: { customObjectName: string; customObjectId: string } }
) {
  const { customObjectName, customObjectId } = params;

  try {
    // Type assertion to inform TypeScript that we are accessing a Prisma model
    const model = db[customObjectName as keyof PrismaClient] as any;
    if (typeof model.findMany !== "function") {
      return new NextResponse("Invalid model name", { status: 400 });
    }

    const customObject = await model.findMany({
      where: {},
    });
    return NextResponse.json(customObject);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET ORGANIZATION]", { status: 400 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { customObjectName: string } }
) {
  const receivedData = await request.json();
  const { customObjectName } = params;
  console.log("request:", receivedData);

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Type assertion to inform TypeScript that we are accessing a Prisma model
    const model = db[customObjectName as keyof PrismaClient] as any;
    if (typeof model.create !== "function") {
      return new NextResponse("Invalid model name", { status: 400 });
    }

    const newCustomObjectData = await model.create({
      data: receivedData,
    });

    return NextResponse.json(newCustomObjectData);
  } catch (error) {
    console.error(error);
    return new NextResponse("[CREATE ORGANIZATION]", { status: 400 });
  }
}
