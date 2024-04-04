import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const receivedData = await request.json();
  //   console.log("request:", receivedData);

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const newRegistrations = await db.registration.createMany({
      data: receivedData,
    });
    console.log(newRegistrations);

    return NextResponse.json(newRegistrations, { status: 201 });
  } catch (error) {
    return new NextResponse("[CREATE REGISTRATION]", { status: 400 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const registrations = await db.registration.findMany({});
    return NextResponse.json(registrations, { status: 200 });
  } catch (error) {
    return new NextResponse("[GET REGISTRATION]", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { registrationId } = await request.json();

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.registration.delete({
      where: {
        id: registrationId,
      },
    });
    return NextResponse.json("Registration deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("[DELETE REGISTRATION]", { status: 400 });
  }
}
