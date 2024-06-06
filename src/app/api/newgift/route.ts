import { connectDb } from "@/lib/connect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const models = await connectDb();
    try {
        upload.single('image')(req, null, async (err: any) => {

        })
        if (models) {
            const { Gift } = models;
            const gift = new Gift({title: body.get('title'), description: body.get('description'), price: body.get('price')});
            await gift.save();
            return Response.json({message: 'Gift succesfully registered', gift});
        } else {
            return Response.json({message: 'No models found'});
        }
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e})
    }
}