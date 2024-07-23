'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { AdminData } from "@/lib/helpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from "react";
import GuestForm from "./GuestForm";
import GroupForm from "./GroupForm";
import GuestList from "./GuestList";
import GuestMessages from "./GuestMessages";
import ThemeImage from "../ThemeImage";
import Share from '../../../public/ios_share.svg';
import ShareDark from '../../../public/ios_share_dark.svg';

const DashboardContent = ({data, parsedData}: {data: AdminData, parsedData: AdminData}) => {
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

    const tabClassName = 'data-[selected]:text-text-100 transition-colors focus:outline-none data-[selected]:dark:text-dark-text-100 text-text-100/75 dark:text-dark-text-100/75';

    if (data.length === 0) {
        <h2>Sem dados cadastrados</h2>
    } else {
        return (
            <TabGroup className='flex overflow-y-scroll flex-col gap-4'>
                <TabList className='gap-4 flex'>
                    <Tab className={tabClassName}>Mensagens</Tab>
                    <Tab className={tabClassName}>Cadastrar convidados</Tab>
                    <Tab className={tabClassName}>Lista de convidados</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4 rounded-md">
                            <h2 className="text-xl font-bold">Mensagens</h2>
                            <GuestMessages data={data} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex rounded-md flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <button onClick={(e) => {e.preventDefault(); setState('selection')}} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">Voltar</button>
                                    <h1 className="text-2xl font-bold">Cadastro de convidados</h1>
                                </div>
                                {renderContent(state)}
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="bg-bg-200 dark:bg-dark-bg-200 rounded-md p-4 flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold">Lista de convidados</h2>
                                <ThemeImage srcDark={ShareDark} srcLight={Share} alt="Exportar" />
                            </div>
                            <GuestList data={parsedData} />
                        </div>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        )
    }
}

export default function Dashboard({session, data}: {session: Session, data: AdminData}) {
    const groups = data.filter(e => 'users' in e);
    const individuals = data.filter(e => !('users' in e));
    const groupedIndividuals: string[] = [];

    groups.forEach(g => {
        g.users.forEach(u => {
            groupedIndividuals.push(u._id);
        });
    });

    const parsedData = [...groups, ...individuals.filter(i => (!groupedIndividuals.includes(i._id) && i.name !== 'admin'))];

    return (
        <div className="flex h-full flex-col overflow-y-hidden gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Bem-vindo(a) {session?.user?.name}</p>
                <button className="text-left" onClick={() => signOut()}>Encerrar sessão</button>
            </div>
            <DashboardContent data={data} parsedData={parsedData} />
        </div>
    )
}