import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Product, Substance } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    //Retrieve the product by its id
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product)
      return new NextResponse("Application not found", { status: 404 });

    //parse Substance data from the body
    const substanceData = await request.json();

    //Create a new Product2Substance record to assciate the product with the application

    // Begin a Prisma transaction
    const createdProduct2Substances = await db.$transaction(
      async (transaction) => {
        //Create new Product2Substance record for each substanceID
        return Promise.all(
          substanceData.map(async (substance: Substance) => {
            const createdProduct2Substance =
              await transaction.product2Substance.create({
                data: {
                  product: {
                    connect: {
                      id: productId,
                    },
                  },
                  substance: {
                    connect: {
                      id: substance.id,
                    },
                  },
                },
              });
          })
        );
      }
    );

    return NextResponse.json(createdProduct2Substances);
  } catch (error) {
    console.log(error);
    return new NextResponse("[PUT APPLICATION]", { status: 400 });
  }
}
