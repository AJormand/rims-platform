import { db } from "@/lib/db";




export async function POST(request: Request) {
    const receivedData = await request.json()


    try {

        const newCollection = await db.createCollection()
        
    } catch (error) {
        console.log(error)
    }
}