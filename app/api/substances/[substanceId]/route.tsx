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
