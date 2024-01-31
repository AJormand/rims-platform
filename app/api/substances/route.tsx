import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const receivedData = await request.json();
  console.log("request:", receivedData);

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const newSubstance = await db.substance.create({
      data: {
        name: receivedData.name,
        type: receivedData.type,
        EVcode: receivedData.EVcode,
        status: receivedData.status,
      },
    });
    return NextResponse.json(newSubstance);
  } catch (error) {
    return new NextResponse("[CREATE SUBSTANCE]", { status: 400 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const substances = await db.substance.findMany({});
    return NextResponse.json(substances);
  } catch (error) {
    return new NextResponse("[GET SUBSTANCE]", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { substanceId } = await request.json();

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.substance.delete({
      where: {
        id: substanceId,
      },
    });
    return NextResponse.json("Substance deleted");
  } catch (error) {
    return new NextResponse("[DELETE SUBSTANCE]", { status: 400 });
  }
}
