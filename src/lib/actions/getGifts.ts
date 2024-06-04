import { Model } from "mongoose";
import { IGift } from "../Models/Interfaces";

export async function getGifts({Gift}: {Gift: Model<IGift>}) {
    const gifts = await Gift.find();
    if (gifts) {
        const parsedGifts = gifts.map(gift => gift.toObject<IGift & {_id: string}>({flattenObjectIds: true}))
        return parsedGifts;
    }
    return null;
}