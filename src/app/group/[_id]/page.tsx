import Content from "../../Content";
import { redirect } from "next/navigation";
import { getGifts } from "@/lib/actions/getGifts";
import { getGroup } from "@/lib/actions/getGroup";
import { connectDb } from "@/lib/connect";

export default async function Home({params}: {params?: {_id: string}}) {

    const models = await connectDb();

    if (models) {

    const { Gift, Group } = models;

        const gifts = await getGifts({Gift});

    const group = await getGroup({params, Group});

    if (!group) redirect('/');

    if (gifts) return <Content gifts={gifts} item={group} />;
    }
}