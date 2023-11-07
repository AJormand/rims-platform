import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET(request: Request, params: { applicationId: string }) {
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
