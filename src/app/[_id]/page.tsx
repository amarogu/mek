import { getItem } from "@/lib/actions/getItem";
import { connectDb } from "@/lib/connect";
import Content from "../Content";
import { getGifts } from "@/lib/actions/getGifts";
import { redirect } from "next/navigation";
import 'dotenv/config';

export default async function Home({params}: {params?: {_id: string}}) {
    const models = await connectDb();
    if (models) {
        const { User, Group, Gift } = models;
        const gifts = await getGifts({Gift});
        const item = await getItem({params, User, Group});
        const gmpApiKey = process.env.GMP_API_KEY as string;

        if (!item) redirect('/');

        if (gifts) {
            return <Content gmpApiKey={gmpApiKey} gifts={gifts} item={item} />;
        } else {
            redirect('/');
        }
    }
    return null;
}