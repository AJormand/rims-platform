import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const GET = async (
  request: Request,
  { params }: { params: { registrationId: string } }
) => {
  const { registrationId } = params;

  const { userId } = auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });
  try {
    const registration = await db.registration.findUnique({
      where: {
        id: registrationId,
      },
      include: {
        product: true,
        application: true,
      },
    });

    console.log(registration);

    return NextResponse.json(registration);
  } catch (error) {
    return new NextResponse("[GET REGISTRATION]", { status: 400 });
  }
};

export async function PUT(
  request: Request,
  { params }: { params: { registrationId: string } }
) {
  const { values } = await request.json();
  const { registrationId } = params;
  console.log("values:", values);
  console.log("registrationId:", registrationId);

  try {
    const updatedRegistration = await db.registration.update({
      where: {
        id: registrationId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(updatedRegistration, { status: 200 });
  } catch (error) {
    return new NextResponse("[UPDATE REGISTRATION]", { status: 400 });
  }
}
