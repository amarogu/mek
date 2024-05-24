import { connectDb } from "@/lib/connect";
import { User } from "@/lib/Models/User";
import Content from "../../Content";
import { redirect } from "next/navigation";
import { getGifts } from "@/lib/actions/getGifts";
import { getGuest } from "@/lib/actions/getGuest";

export default async function Home({params}: {params?: {_id: string}}) {

    const gifts = await getGifts();

    const parsedUser = await getGuest({params});

    if (!parsedUser) redirect('/');

    return <Content gifts={gifts} item={parsedUser} />;
}