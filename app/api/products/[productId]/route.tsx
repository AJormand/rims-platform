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

  //get Product and linked applications
  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        productApplications: {
          include: {
            application: true,
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse("[GET PRODUCT]", { status: 400 });
  }
};
