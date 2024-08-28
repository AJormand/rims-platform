import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

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
