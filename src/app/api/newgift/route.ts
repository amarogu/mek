import { connectDb } from "@/lib/connect";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
    const body = await req.formData();
    const models = await connectDb();
    try {
        if (models) {
            const image = body.get('image');
            if (!image) {
                return Response.json({message: 'Please provide an image'}, {status: 400});
            }
            if (image instanceof File) {
                const buffer = Buffer.from(await image.arrayBuffer());
                const filename = image.name.replaceAll(' ', '_');
                console.log(path.join(process.cwd(), `uploads/${filename}`));
                if (!existsSync(path.join(process.cwd(), 'uploads/'))) {
                    mkdirSync(path.join(process.cwd(), 'uploads/'));
                    await writeFile(path.join(process.cwd(), `uploads/${filename}`), buffer);
                } else {
                    await writeFile(path.join(process.cwd(), `uploads/${filename}`), buffer);
                }
                const { Gift } = models;
                const gift = new Gift({title: body.get('title'), description: body.get('description'), value: body.get('value'), img: `uploads/${filename}`});
                await gift.save();
                return Response.json({message: 'Gift succesfully registered'});
            } else {
                return Response.json({message: 'Please provide a valid image'}, {status: 400});
            }
        } else {
            return Response.json({message: 'No models found'});
        }
    } catch (e: any) {
        console.log(e);
        return Response.json({message: 'An error occurred', error: e})
    }
}