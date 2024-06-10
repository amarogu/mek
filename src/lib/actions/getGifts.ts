import { Model } from "mongoose";
import { IGift } from "../Models/Interfaces";
import { LeanDocument } from "../helpers";

export async function getGifts({Gift}: {Gift: Model<IGift>}) {
    const gifts = await Gift.find();
    if (gifts) {
        const parsedGifts: LeanDocument<IGift>[] = gifts.map(gift => gift.toObject({flattenObjectIds: true}))
        return parsedGifts;
    }
    return null;
}