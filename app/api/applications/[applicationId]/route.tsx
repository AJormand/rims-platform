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

  //get Application
  try {
    const application = await db.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        products2Application: {
          include: {
            product: true,
          },
        },
        countries: true,
        registrations: true,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    return new NextResponse("[GET APPLICATION]", { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { applicationId: string } }
) {
  const { values } = await request.json();
  const { applicationId } = params;
  console.log("values:", values);
  console.log("applicationId:", applicationId);

  try {
    const updatedApplication = await db.application.update({
      where: {
        id: applicationId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedApplication, { status: 200 });
  } catch (error) {
    return new NextResponse("[UPDATE APPLICATION]", { status: 400 });
  }
}
