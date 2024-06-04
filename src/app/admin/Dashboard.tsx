'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { PlainAdminData } from "@/lib/helpers";

const renderDashboard = (data: PlainAdminData) => {
    if (data.length === 0) {
        <h2>Sem dados cadastrados</h2>
    } else {
        return (
            <div>
                <div className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4">
                <h2 className="text-xl font-bold">Mensagens</h2>
                {
                    data.map(entity => {
                        if (entity.msgs.length !== 0) {
                            return (
                                <div className="bg-bg-300 dark:bg-dark-bg-300 p-4" key={entity._id}>
                                    {entity.msgs.map((msg, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <p>{msg.content}</p>
                                            <p className="text-text-100/75 dark:text-dark-text-100/75">{entity.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    })
                }
                </div>
            </div>
        )
    }
}

export default function Dashboard({session, data}: {session: Session, data: PlainAdminData}) {
    
    return (
        <main className="p-8 container mx-auto">
            <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Bem-vindo(a) {session?.user?.name}</p>
            <button className="text-left" onClick={() => signOut()}>Encerrar sessão</button>
            </div>
            {renderDashboard(data)}
        </div>
        </main>
    )
}