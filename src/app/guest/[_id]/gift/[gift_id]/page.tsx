import { Gift } from "@/lib/Models/Gift";
import { connectDb } from "@/lib/connect";
import { redirect } from "next/navigation";
import Content from "@/lib/CheckoutComponents/Content";

export default async function Home({params}: {params?: {gift_id: string, _id: string}}) {
    await connectDb();
    let gift: Gift | null = null;
    try {
        if (params) {
            gift = await Gift.findById(params.gift_id);
        }
    } catch (e: any) {
        if (params) redirect(`/guest/${params._id}`);
    }

    if (!gift) redirect(`/guest/${params?._id}`);

    const parsedGift = {
        _id: gift._id.toString(),
        title: gift.title,
        description: gift.description,
        value: gift.value,
        __v: gift.__v
    }

    return <Content gift={parsedGift} />
}