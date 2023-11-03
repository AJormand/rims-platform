import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const receivedData = await request.json();
  console.log(receivedData); // Log the values in the request body

  try {
    const newProduct = await db.product.create({
      data: {
        name: receivedData.name,
        category: receivedData.category,
        origin: receivedData.origin,
        status: receivedData.status,
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    return new NextResponse("[CREATE PRODUCT]", { status: 400 });
  }
}
