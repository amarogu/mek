import { connectDb } from "@/lib/connect";
import Content from "../../Content";
import { redirect } from "next/navigation";
import { Group } from "@/lib/Models/Group";
import { User } from "@/lib/Models/User";
import { getGifts } from "@/lib/actions/getGifts";
import { getGroup } from "@/lib/actions/getGroup";

export default async function Home({params}: {params?: {_id: string}}) {
    const gifts = await getGifts();

    const parsedGroup = await getGroup({params});

    if (!parsedGroup) redirect('/');

    return <Content gifts={gifts} item={parsedGroup} />;
}