import instance from "@/lib/axios";
import { type User } from "@/lib/Models/User";
import Content from "./Content";
import { notFound } from "next/navigation";

export default async function Home({params}: {params?: {user: string}}) {
    const user = (await instance.get(`user?_id=${params?.user}`)).data.user as User;
    if (!user) notFound();
    return <Content user={user} />;
}