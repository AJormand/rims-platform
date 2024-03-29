import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const receivedData = await request.json();
  console.log("received data: ", receivedData);
  console.log(receivedData.name);

  try {
    const newApplication = await db.application.create({
      data: {
        name: receivedData.name,
        country: receivedData.country,
        procedureType: receivedData.procedureType,
        status: receivedData.status,
      },
    });

    return NextResponse.json(newApplication);
  } catch (error) {
    console.log(error);
    return new NextResponse("[CREATE PRODUCT]", { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    const applicationData = await db.application.findMany();
    return NextResponse.json(applicationData);
  } catch (error) {
    return new NextResponse("[GET APPLICATION]", { status: 400 });
  }
}
