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
    const newCV = await db.controlledVocabulary.create({
      data: {
        name: receivedData.name,
        value: receivedData.value,
        description: receivedData.description,
        status: "Active",
      },
    });
    return NextResponse.json(newCV, { status: 201 });
  } catch (error) {
    return new NextResponse("[CREATE CV]", { status: 400 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const CVs = await db.controlledVocabulary.findMany({});
    return NextResponse.json(CVs, { status: 200 });
  } catch (error) {
    return new NextResponse("[GET CV]", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { controlledVocabularyId } = await request.json();

  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.country.delete({
      where: {
        id: controlledVocabularyId,
      },
    });
    return NextResponse.json("CV deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("[DELETE CV]", { status: 400 });
  }
}
