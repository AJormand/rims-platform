import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const GET = async (
  request: Request,
  { params }: { params: { productId: string } }
) => {
  const { productId } = params;

  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("[GET PRODUCT]", { status: 400 });
  }
};
