import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    const userId = auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const client = await clientPromise
        const db = await client.db("rims-platform");
        const collection = db.collection("CustomObjectTemplates");

        const templates = await collection.find({}).toArray();

        return NextResponse.json(templates);
        
    } catch (error) {
        console.log(error);
        return new NextResponse("[GET TEMPLATE]", { status: 400 });
    }

}