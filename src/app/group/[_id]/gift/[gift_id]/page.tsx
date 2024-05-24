import { Gift } from "@/lib/Models/Gift";
import { connectDb } from "@/lib/connect";
import { redirect } from "next/navigation";
import Content from "./Content";

export default async function Home({params}: {params?: {gift_id: string}}) {
    await connectDb();
    let gift: Gift | null = null;
    let parsedGift: Gift | null = null;
    try {
        if (params) {
            gift = await Gift.findById(params.gift_id);
        }
    } catch (e: any) {
        redirect('/');
    }

    if (!gift) redirect('/');

    parsedGift = {
        _id: gift._id.toString(),
        title: gift.title,
        description: gift.description,
        value: gift.value,
        __v: gift.__v
    }

    return <Content gift={parsedGift} />
}