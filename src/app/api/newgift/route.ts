import { connectDb } from "@/lib/connect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json() as { title: string, description: string, value: string };
    const models = await connectDb();
    try {
        if (models) {
            const { Gift } = models;
            const gift = new Gift(body);
            await gift.save();
            return Response.json({message: 'Gift succesfully registered', gift});
        } else {
            return Response.json({message: 'No models found'});
        }
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e})
    }
}