'use client';
import instance from "@/lib/axios";
import { type User } from "@/lib/Models/User";
import Content from "./Content";
import { redirect } from "next/navigation";

export default async function Home({params}: {params?: {_id: string}}) {
    let user: User | null = null;
    let err: any = null;

    try {
        user = (await instance.get(`user?id=${params?._id}`)).data.user as User;
        console.log(user);
    } catch (error: any) {
        console.log(error);
        err = error
    }

    return <><h1>{user?.name}</h1></>;
}