import Content from "../../Content";
import { redirect } from "next/navigation";
import { getGifts } from "@/lib/actions/getGifts";
import { getGroup } from "@/lib/actions/getGroup";

export default async function Home({params}: {params?: {_id: string}}) {
    const gifts = await getGifts();

    const group = await getGroup({params});

    if (!group) redirect('/');

    return <Content gifts={gifts} item={group} />;
}