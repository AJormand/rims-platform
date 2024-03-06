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
    const newSubstance = await db.country.create({
      data: {
        name: receivedData.name,
        code: receivedData.code,
        region: receivedData.region,
      },
    });
    return NextResponse.json(newSubstance);
  } catch (error) {
    return new NextResponse("[CREATE COUNTRY]", { status: 400 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const countries = await db.country.findMany({});
    return NextResponse.json(countries);
  } catch (error) {
    return new NextResponse("[GET COUNTRY]", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { countryId } = await request.json();

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.country.delete({
      where: {
        id: countryId,
      },
    });
    return NextResponse.json("Country deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("[DELETE COUNTRY]", { status: 400 });
  }
}
