import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { templateName: string } }
) {
  const userId = auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { templateName } = params;
  console.log(templateName);

  try {
    const deletedTemplate = await db.customObjectsTemplates.delete({
      where: {
        name: templateName,
      },
    });

    return NextResponse.json(deletedTemplate, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("[DELETE TEMPLATE]", { status: 400 });
  }
}

export async function GET(
  request: Request, {params}: {params: {templateName: string  }}){

    const userId = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const { templateName } = params;

    try {
      const template = await db.customObjectsTemplates.findUnique({
        where: {
          name:templateName
        }
      })

      return NextResponse.json(template, { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse("[GET TEMPLATE]", { status: 400 });
    }
    
  }