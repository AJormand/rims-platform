import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export async function GET(request: Request, { params }: { params: { collectionName: string } }) {
    const { collectionName } = params

    console.log("XXX",{collectionName})

    try {
        const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
        let schemaContent = fs.readFileSync(schemaPath, 'utf8');

        const modelRegex = new RegExp(`model ${collectionName} \\{[^\\}]*\\}\\n*`, 'g');
        const modelMatches = schemaContent.match(modelRegex);
        console.log(modelMatches)

        if(!modelMatches) return new NextResponse("[GET COLLECTION]", { status: 400 })

        return new NextResponse(modelMatches[0], { status: 200 })
        
    } catch (error) {
        console.log(error)
        return new NextResponse("[GET COLLECTION]", { status: 400 })
    }







}