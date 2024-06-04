import { Gift } from "../Models/Gift";
import { IGift } from "../Models/Interfaces";
import { Model } from "mongoose";

export async function getGift({params, Gift}: {params?: {gift_id: string}, Gift: Model<IGift>}) {
    try {
        if (params) {
            const gift = await Gift.findById(params.gift_id);
            if (gift) {
                return gift.toObject<IGift & {_id: string}>({flattenObjectIds: true});
            }
        }
        return null;
    } catch (e: any) {
        return null;
    }
}