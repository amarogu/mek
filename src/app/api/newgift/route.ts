import { connectDb } from "@/lib/connect";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import { Storage } from '@google-cloud/storage';
import 'dotenv/config';

const storage = new Storage({
    keyFilename: `@/../keys/${process.env.KEY_FILENAME}`
});

const bucketName = process.env.BUCKET_NAME as string;

const bucket = storage.bucket(bucketName);

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
                const blob = bucket.file(`uploads/${filename}`);
                const blobStream = blob.createWriteStream({resumable: false});
                blobStream.end(buffer);
                blob.makePublic(async function(err: any) {
                    if (err) {
                        return Response.json({message: 'An error occurred while making uploaded file available to the internet.', error: err});
                    } else {
                        const publicUrl = blob.publicUrl();
                        const { Gift } = models;
                        const gift = new Gift({title: body.get('title'), description: body.get('description'), value: body.get('value'), img: publicUrl});
                        await gift.save();
                        return Response.json({message: 'Gift succesfully registered'});
                    }
                })
            } else {
                return Response.json({message: 'Please provide a valid image'}, {status: 400});
            }
        } else {
            return Response.json({message: 'No models found'});
        }
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e})
    }
}