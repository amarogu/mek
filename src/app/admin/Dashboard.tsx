'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { IAdminData } from "@/lib/actions/getAdminData";

export default function Dashboard({session, data}: {session: Session, data?: IAdminData}) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
           
        </div>
    )
}