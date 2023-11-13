import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Product } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  const { applicationId } = params;

  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const application = await db.application.findUnique({
      where: {
        id: applicationId,
      },
    });
    return NextResponse.json(application);
  } catch (error) {
    return new NextResponse("[GET APPLICATION]", { status: 400 });
  }
}

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
    // const createdProduct2Application = await db.product2Application.create({
    //   data: {
    //     product: {
    //       connect: {
    //         id: productData[0].id,
    //       },
    //     },
    //     application: {
    //       connect: {
    //         id: applicationId,
    //       },
    //     },
    //   },
    // });

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

    // Commit the transaction
    //await db.$queryRaw`COMMIT`;

    return NextResponse.json(createdProduct2Applications);
  } catch (error) {
    console.log(error);
    return new NextResponse("[PUT APPLICATION]", { status: 400 });
  }
}
