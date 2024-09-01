import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

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
