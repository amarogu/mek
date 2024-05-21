import { connectDb } from "./connect";
import { Gift } from "./Models/Gift";

export async function getGifts() {
    await connectDb();
    const gifts = await Gift.find();
    const parsedGifts: Gift[] = gifts.map(gift => {
        return {
            _id: gift._id.toString(),
            title: gift.title,
            description: gift.description,
            value: gift.value,
            __v: gift.__v
        }
    })
    return parsedGifts;
}