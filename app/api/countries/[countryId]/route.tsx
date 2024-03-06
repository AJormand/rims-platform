import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { countryId: string } }
) {
  const { countryId } = params;
  console.log(countryId);

  try {
    const country = await db.country.findUnique({
      where: {
        id: countryId,
      },
    });
    return NextResponse.json(country);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET COUNTRY]", { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { countryId: string } }
) {
  const { countryId } = params;
  const { values } = await request.json();

  try {
    await db.country.update({
      where: {
        id: countryId,
      },
      data: { ...values },
    });
    return new NextResponse("Country updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[UPDATE COUNTRY]", { status: 400 });
  }
}
