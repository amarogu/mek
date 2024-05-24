import Content from "../../Content";
import { redirect } from "next/navigation";
import { getGifts } from "@/lib/actions/getGifts";
import { getGuest } from "@/lib/actions/getGuest";

export default async function Home({params}: {params?: {_id: string}}) {
    const gifts = await getGifts();

    const guest = await getGuest({params});

    if (!guest) redirect('/');

    return <Content gifts={gifts} item={guest} />;
}