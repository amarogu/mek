import { getItem } from "@/lib/actions/getItem";
import { connectDb } from "@/lib/connect";
import Content from "../Content";
import { getGifts } from "@/lib/actions/getGifts";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {_id: string}}) {
    const models = await connectDb();
    if (models) {
        const { User, Group, Gift } = models;
        const gifts = await getGifts({Gift});
        const item = await getItem({params, User, Group});

        if (!item) redirect('/');

        if (gifts) {
            return <Content gifts={gifts} item={item} />;
        } else {
            redirect('/');
        }
    }
    return null;
}