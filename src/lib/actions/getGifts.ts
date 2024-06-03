import { connectDb } from "../connect";
import { Gift, IGift } from "../Models/Gift";
import { HydratedDocument } from "mongoose";

export async function getGifts() {
    await connectDb();
    const gifts: HydratedDocument<IGift>[] = await Gift.find();
    return gifts;
}