'use client'
import GuestForm from "./GuestForm";
import GroupForm from "./GroupForm";
import { useState } from "react";

export default function Home() {

    const [state, setState] = useState<'selection' | 'user' | 'group'>('selection');

    const renderContent = (state: 'selection' | 'user' | 'group') => {
        switch (state) {
            case 'selection':
                return <div className="flex gap-4"><button onClick={() => setState('user')} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">Cadastrar convidado</button><button onClick={() => setState('group')} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">Cadastrar grupo</button></div>;
            case 'user':
                return <GuestForm />;
            case 'group':
                return <GroupForm />;
        }
    }

    return (
        <main className="flex p-8 items-center justify-center h-screen">
            <form className="p-8 flex flex-col gap-4 bg-bg-200 dark:bg-dark-bg-200 rounded-sm">
                <div className="flex items-center gap-4">
                    <button onClick={(e) => {e.preventDefault(); setState('selection')}} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">Voltar</button>
                    <h1 className="text-2xl font-bold">Cadastro de convidados</h1>
                </div>
                {renderContent(state)}
            </form>
        </main>
    )
}