import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const registrations = await db.registration.findMany({
      where: {
        productId: productId,
      },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET REGISTRATIONS FOR PRODUCT]", { status: 400 });
  }
}
