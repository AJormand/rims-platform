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

export async function POST(request: Request) {
    const userId = auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    //const receivedData = await request.json();
    const receivedData = {
        name: "New Template",
        fields: [
            {
                name: "Field 1",
                type: "String",
                required: true,
            },
            {
                name: "Field 2",
                type: "String",
                required: false,
            },
        ],
    }
    console.log("request:", receivedData);

    try {
        const client = await clientPromise
        const db = await client.db("rims-platform");
        const collection = db.collection("CustomObjectTemplates");

        const newTemplate = await collection.insertOne(receivedData);

        return NextResponse.json(newTemplate);
        
    } catch (error) {
        console.log(error);
        return new NextResponse("[CREATE TEMPLATE]", { status: 400 });
    }
}