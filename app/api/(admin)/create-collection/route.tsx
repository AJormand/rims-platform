import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    console.log("XXXXXX")


    const receivedData = await request.json()


    try {

        const newCollection = await db.$runCommandRaw({
            create: 'myNewCollection'
        });

         console.log('Collection created!');


        return NextResponse.json(newCollection);
        
    } catch (error) {
        console.log(error)
        return new NextResponse("[CREATE COLLECTION]", { status: 400 });
    }
}

export async function GET(request: Request) {
    console.log("Get collections")

    try {
        const collecitons = await db.$runCommandRaw({
            listCollections:1
        })

        return NextResponse.json(collecitons);
        
    } catch (error) {
        console.log(error)
        return new NextResponse("[GET COLLECTIONS]", { status: 400 });
    }

}

