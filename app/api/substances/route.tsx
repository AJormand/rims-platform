import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const receivedData = await request.json();
  console.log("request:", receivedData);

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
