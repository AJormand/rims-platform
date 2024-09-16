
import fs from "fs";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";
import { NextResponse } from "next/server";

const execAsync = promisify(exec);

export async function GET(){
    const pushOutput = await execAsync("npx prisma db push");
    console.log("Prisma db push output:", pushOutput.stdout, pushOutput.stderr);
    await execAsync("npx prisma generate");
    return new NextResponse("Model updated successfully", { status: 200 });
}