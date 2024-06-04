'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { PlainAdminData } from "@/lib/helpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { IGift, IMsg } from "@/lib/Models/Interfaces";

type TabData = {
    tab: 'Mensagens' | 'Presentes',
    entityPath: 'msgs' | 'giftsGiven'
};

const renderPath = (path: IMsg | IGift) => {
    if ('content' in path) {
        return (
            <p>
                {path.content}
            </p>
        )
    } else {
        return (
            <div className="flex flex-col gap-2">
                <p>{path.title}</p>
                <p className="text-text-100/75 dark:text-dark-text-100/75">{path.description}</p>
                <p className="text-text-100/75 dark:text-dark-text-100/75">R$ {path.value}</p>
            </div>
        )
    }
}

const renderDashboard = (data: PlainAdminData) => {

    const tabs: TabData[] = [
        {
            tab: 'Mensagens',
            entityPath: 'msgs'
        },
        {
            tab: 'Presentes',
            entityPath: 'giftsGiven'
        }
    ]

    if (data.length === 0) {
        <h2>Sem dados cadastrados</h2>
    } else {
        return (
            <TabGroup className='flex flex-col gap-4'>
                <TabList className='gap-4 flex'>
                    {
                        tabs.map(({tab}, i) => {
                            return <Tab key={i} className='data-[selected]:text-text-100 transition-colors focus:outline-none data-[selected]:dark:text-dark-text-100 text-text-100/75 dark:text-dark-text-100/75'>{tab}</Tab>
                        })
                    }
                </TabList>
                <TabPanels>
                    {
                        tabs.map(({tab, entityPath}, i) => {
                            return (
                                <TabPanel key={i}>
                                    <div>
                                        <div className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4">
                                            <h2 className="text-xl font-bold">{tab}</h2>
                                            {
                                                data.map(entity => {
                                                    if (entity[entityPath].length !== 0) {
                                                        return (
                                                            <div className="bg-bg-300 dark:bg-dark-bg-300 p-4 flex flex-col gap-4" key={entity._id}>
                                                                {entity[entityPath].map((path, i) => (
                                                                    <div key={i} className="flex flex-col gap-2">
                                                                        {renderPath(path)}
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
                                </TabPanel>
                            )
                        })
                    }
                </TabPanels>
            </TabGroup>
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