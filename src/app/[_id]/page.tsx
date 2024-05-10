'use server';
import { connectDb } from "@/lib/connect";
import { User } from "@/lib/Models/User";
import Content from "./Content";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {_id: string}}) {
    let user: User | null = null;

    await connectDb();

    try {
        if (params) user = await User.findById(params._id);
    } catch (e: any) {
        redirect('/');
    }

    if (!user) redirect('/');

    return <Content user={user} />;
}