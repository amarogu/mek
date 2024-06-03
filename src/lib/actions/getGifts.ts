import { connectDb } from "../connect";
import { Gift } from "../Models/Gift";
import { IGift } from "../Models/Interfaces";
import { HydratedDocument } from "mongoose";

export async function getGifts() {
    await connectDb();
    const gifts: HydratedDocument<IGift>[] = await Gift.find();
    return gifts;
}