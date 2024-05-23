import { Gift } from "@/lib/Models/Gift";
import { connectDb } from "@/lib/connect";
import { redirect } from "next/navigation";
import Content from "./Content";

export default async function Home({params}: {params?: {_id: string}}) {
    await connectDb();
    let gift: Gift | null = null;
    try {
        if (params) {
            gift = await Gift.findById(params._id);
        }
    } catch (e: any) {
        console.log(e);
        redirect('/');
    }

    if (!gift) redirect('/');

    return <Content gift={gift} />
}