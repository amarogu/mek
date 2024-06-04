'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { PlainAdminData } from "@/lib/helpers";

const renderDashboard = (data: PlainAdminData) => {
    if (data.length === 0) {
        <h2>Sem dados cadastrados</h2>
    } else {
        return (
            <div key={'identifier'}>
                {
                    data.map(entity => {
                        if (entity.msgs.length !== 0) {
                            return (
                                <div key={entity._id}>
                                    {entity.msgs.map((msg, i) => (
                                        <div key={i}>
                                            <p>{msg.content}</p>
                                            <p>{entity.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

export default function Dashboard({session, data}: {session: Session, data: PlainAdminData}) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
            {renderDashboard(data)}
        </div>
    )
}