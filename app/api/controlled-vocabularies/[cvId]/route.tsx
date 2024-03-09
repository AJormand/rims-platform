import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { cvId: string } }
) {
  const { cvId } = params;
  console.log("GET CV");
  console.log(cvId);

  try {
    const controlledVocabulary = await db.controlledVocabulary.findUnique({
      where: {
        id: cvId,
      },
    });
    return NextResponse.json(controlledVocabulary);
  } catch (error) {
    console.log(error);
    return new NextResponse("[GET CV]", { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { cvId: string } }
) {
  const { cvId } = params;
  const { values } = await request.json();

  try {
    await db.controlledVocabulary.update({
      where: {
        id: cvId,
      },
      data: { ...values },
    });
    return new NextResponse("CV updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("[UPDATE CV]", { status: 400 });
  }
}
