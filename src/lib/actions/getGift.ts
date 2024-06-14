import { IGift } from "../Models/Interfaces";
import { Model } from "mongoose";
import { LeanDocument } from "../helpers";

export async function getGift({params, Gift}: {params?: {gift_id: string}, Gift: Model<IGift>}) {
    try {
        if (params) {
            const gift = await Gift.findById(params.gift_id);
            if (gift) {
                const parsedGift: LeanDocument<IGift> = gift.toObject({flattenObjectIds: true});
                return parsedGift;
            }
        }
        return null;
    } catch (e: any) {
        return null;
    }
}