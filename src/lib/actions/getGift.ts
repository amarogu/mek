import { connectDb } from "../connect";
import { Gift } from "../Models/Gift";

export async function getGift({params}: {params?: {gift_id: string}}) {
    await connectDb();

    let gift: Gift | null = null;

    try {
        if (params) {
            gift = await Gift.findById(params.gift_id);
        }
        if (gift) return {
            _id: gift._id.toString(),
            title: gift.title,
            description: gift.description,
            value: gift.value,
            __v: gift.__v
        };
        return null;
    } catch (e: any) {
        return null;
    }
}