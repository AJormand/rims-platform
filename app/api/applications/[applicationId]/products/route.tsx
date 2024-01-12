import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Product } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;

  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    //Retrieve the application by its id
    const application = await db.application.findUnique({
      where: {
        id: applicationId,
      },
    });
    if (!application)
      return new NextResponse("Application not found", { status: 404 });

    //parse Product data from the body
    const productData = await request.json();
    console.log(productData[0].id);

    //Create a new Product2Application record to assciate the product with the application

    // Begin a Prisma transaction
    const createdProduct2Applications = await db.$transaction(
      async (transaction) => {
        //Create new Product2Application record for each productID
        return Promise.all(
          productData.map(async (product: Product) => {
            const createdProduct2Application =
              await transaction.product2Application.create({
                data: {
                  product: {
                    connect: {
                      id: product.id,
                    },
                  },
                  application: {
                    connect: {
                      id: applicationId,
                    },
                  },
                },
              });
          })
        );
      }
    );

    return NextResponse.json(createdProduct2Applications);
  } catch (error) {
    console.log(error);
    return new NextResponse("[PUT APPLICATION]", { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;
  const { productId } = await request.json();
  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const product2Application = await db.product2Application.findMany({
      where: {
        productId: productId,
        applicationId: applicationId,
      },
    });

    console.log(product2Application);

    product2Application.forEach(async (product2Application) => {
      await db.product2Application.delete({
        where: {
          id: product2Application.id,
        },
      });
    });

    // db.product2Application.delete({
    //   where: {
    //     id: productId,
    //   },
    // });
    return new NextResponse(JSON.stringify(product2Application), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[DELETE APPLICATION]", { status: 400 });
  }
}
