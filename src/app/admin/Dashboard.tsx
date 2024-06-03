'use client';
import { IGift } from "@/lib/Models/Gift";
import { IGroup } from "@/lib/Models/Group";
import { IMsg } from "@/lib/Models/Msg";
import { IUser } from "@/lib/Models/User";
import { HydratedDocument, MergeType } from "mongoose";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Dashboard({session, data}: {session: Session, data?: {giftsGiven: HydratedDocument<MergeType<IUser | IGroup, {giftsGiven: IGift[]}>>[], msgs: HydratedDocument<MergeType<IUser | IGroup, {msgs: IMsg[]}>>[]}}) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}