import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { substanceId: string } }
) => {
  const { substanceId } = params;
  console.log("params:", substanceId);

  try {
    const substanceData = await db.substance.findUnique({
      where: {
        id: substanceId,
      },
    });
    return NextResponse.json(substanceData);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET SUBSTANCE]", { status: 400 });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { substanceId: string } }
) => {
  const { substanceId } = params;
  const { values } = await request.json();

  try {
    await db.substance.update({
      where: {
        id: substanceId,
      },
      data: {
        ...values,
      },
    });
    return new NextResponse("Substance updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("[UPDATE SUBSTANCE]", { status: 400 });
  }
};
