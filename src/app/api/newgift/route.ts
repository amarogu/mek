import { Gift } from "@/lib/Models/Gift";
import { connectDb } from "@/lib/connect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json() as { title: string, description: string, value: string };
    await connectDb();
    try {
        const gift = new Gift(body);
        await gift.save();
        return Response.json({message: 'Gift succesfully registered', gift});
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e})
    }
}