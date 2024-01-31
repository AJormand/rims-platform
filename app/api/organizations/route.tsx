import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const receivedData = await request.json();
  console.log("request:", receivedData);

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const newOrganization = await db.organization.create({
      data: {
        name: receivedData.name,
        country: receivedData.country,
        address: receivedData.address,
        status: receivedData.status,
      },
    });
    return NextResponse.json(newOrganization);
  } catch (error) {
    return new NextResponse("[CREATE ORGANIZATION]", { status: 400 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const organizations = await db.organization.findMany({});
    return NextResponse.json(organizations);
  } catch (error) {
    return new NextResponse("[GET ORGANIZATION]", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  console.log("-------------------delete");
  const { organizationId } = await request.json();
  console.log("request:", organizationId);

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.organization.delete({
      where: {
        id: organizationId,
      },
    });
    return NextResponse.json("Organization deleted");
  } catch (error) {
    return new NextResponse("[DELETE ORGANIZATION]", { status: 400 });
  }
}
