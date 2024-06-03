import { connectDb } from "../connect";
import { Gift } from "../Models/Gift";

export async function getGift({params}: {params?: {gift_id: string}}) {
    await connectDb();

    try {
        if (params) {
            const gift = await Gift.findById(params.gift_id);
            if (gift) return gift;
        }
        return null;
    } catch (e: any) {
        return null;
    }
}