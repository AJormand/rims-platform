import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';


export async function POST(request: Request) {
    const {collectionName, schemaDefinition} = await request.json()

    if (!collectionName || !schemaDefinition) {
        return new NextResponse('Collection name and schema definition are required', { status: 400 });
    }

    try {
        // Add the new model to schema.prisma
        const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
        let schemaContent = fs.readFileSync(schemaPath, 'utf8');

        const newModel = `

model ${collectionName} {${schemaDefinition}}`;

        schemaContent += newModel;

        fs.writeFileSync(schemaPath, schemaContent, 'utf8');

        // Run prisma generate to apply changes
        exec('npx prisma db push', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running prisma generate: ${stderr}`);
               
            }
            console.log(`Prisma generate output: ${stdout}`);
            return new NextResponse('Collection created!', { status: 200 });
        });
    } catch (error) {
        console.error(error);
    }
}

/*
export async function POST(request: Request) {

    console.log("XXXXXX")


    const {collectionName} = await request.json()
    console.log(collectionName)


    try {

        const newCollection = await db.$runCommandRaw({
            create: 'myNewCollection'
        });

         console.log('Collection created!');

         // Save schema information in your schema management table or collection
         await db.templateCollection.create({
             data: {
                 name: collectionName,
                 status: 'active',
                 // Include other schema details as needed
             }
         });


        return NextResponse.json(newCollection);
        
    } catch (error) {
        console.log(error)
        return new NextResponse("[CREATE COLLECTION]", { status: 400 });
    }
}
    */

export async function GET(request: Request) {
    console.log("Get collections")
    db.colNewa.create({
        data: {
            name: 'test',
            status: 'active',
        }
    })

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

