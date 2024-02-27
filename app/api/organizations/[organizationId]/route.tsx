import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;

  try {
    const organization = await db.organization.findUnique({
      where: {
        id: organizationId,
      },
    });
    return NextResponse.json(organization);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET ORGANIZATION]", { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { organizationId: string } }
) {
  const { organizationId } = params;
  const { values } = await request.json();

  try {
    await db.organization.update({
      where: {
        id: organizationId,
      },
      data: { ...values },
    });
    return new NextResponse("Organization updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[UPDATE ORGANIZATION]", { status: 400 });
  }
}
