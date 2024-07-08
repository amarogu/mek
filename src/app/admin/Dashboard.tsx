'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { AdminData, Populated } from "@/lib/helpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { IGift, IGroup, IMsg, IPurchase, IUser } from "@/lib/Models/Interfaces";
import { TabData } from "@/lib/helpers";
import { useState } from "react";
import GuestForm from "./GuestForm";
import GroupForm from "./GroupForm";
import CopyToClipboard from "./CopyToClipboard";

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
            <TabGroup className='flex flex-col gap-4'>
                <TabList className='gap-4 flex'>
                    <Tab className={tabClassName}>Mensagens</Tab>
                    <Tab className={tabClassName}>Cadastrar convidados</Tab>
                    <Tab className={tabClassName}>Lista de convidados</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <div className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4 rounded-md">
                            <h2 className="text-xl font-bold">Mensagens</h2>
                            {
                                data.map((e, i) => {
                                    if (e.msgs.length !== 0 && e.name !== 'admin') {
                                        return (
                                            <div key={i} className="bg-bg-300 flex flex-col rounded-md gap-4 dark:bg-dark-bg-300 p-4">
                                                <h3 className="text-lg font-bold">{e.name}</h3>
                                                {
                                                    e.msgs.map((m, j) => (
                                                        <div key={j} className="bg-bg-200 p-4 rounded-md flex flex-col gap-2 dark:bg-dark-bg-200">
                                                            <p>{m.content}</p>
                                                            <p>{m.createdAt.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    } else {
                                        return null
                                    }
                                })
                            }
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
                            <h2 className="text-xl font-bold">Lista de convidados</h2>
                            {
                                parsedData.map((e, i) => {
                                    if ('users' in e) {
                                        return (
                                            <div key={i} className="bg-bg-300 rounded-md flex flex-col gap-4 dark:bg-dark-bg-300 p-4">
                                                <h3 className="text-lg flex gap-2 items-center font-bold">
                                                    <span>{e.name}</span> 
                                                    <span className="opacity-75 text-base font-normal">{e.link}</span>
                                                    <CopyToClipboard contentToWrite={e.link} />
                                                </h3>
                                                <div className="flex flex-col gap-4">
                                                    {
                                                        e.users.map((u, j) => {
                                                            return (
                                                                <div className="bg-bg-200 rounded-md p-4 flex flex-col gap-2 dark:bg-dark-bg-200" key={j}>
                                                                    <div className="flex justify-between">
                                                                        <p className="flex gap-2 items-center">
                                                                            <span>{u.name}</span> 
                                                                            <span className="opacity-75 text-base font-normal">{u.link}</span>
                                                                            <CopyToClipboard contentToWrite={u.link} />
                                                                        </p>
                                                                        <p>{u.confirmed ? 'Sim' : 'Não'}</p>
                                                                    </div>
                                                                    {u.confirmed ? (u.lastConfirmed ? <p><span className="opacity-75">Confirmado pela última vez em:</span> {u.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null) : u.lastRevokedConfirmation ? <p><span className="opacity-75">Confirmação revogada pela última vez em:</span> {u.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        const u = e as Populated<IUser, { msgs: IMsg[], purchases: Populated<IPurchase, {msg: IMsg, giftGiven: IGift}>[] }>;
                                        return (
                                            <div key={i} className="bg-bg-300 rounded-md flex p-4 flex-col gap-2 dark:bg-dark-bg-300">
                                                <div className="flex justify-between">
                                                    <h3 className="text-lg flex gap-2 items-center font-bold">
                                                        <span>{u.name}</span> 
                                                        <span className="opacity-75 text-base font-normal">{u.link}</span>
                                                        <CopyToClipboard contentToWrite={u.link} />
                                                    </h3>
                                                    <p>{u.confirmed ? 'Sim' : 'Não'}</p>
                                                </div>
                                                {u.confirmed ? (u.lastConfirmed ? <p><span className="opacity-75">Confirmado pela última vez em:</span> {u.lastConfirmed.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null) : u.lastRevokedConfirmation ? <p><span className="opacity-75">Confirmação revogada pela última vez em:</span> {u.lastRevokedConfirmation.toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'})}</p> : null}
                                            </div>
                                        )
                                    }
                                })
                            }
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
        <main className="p-8 container mx-auto">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p>Bem-vindo(a) {session?.user?.name}</p>
                    <button className="text-left" onClick={() => signOut()}>Encerrar sessão</button>
                </div>
                <DashboardContent data={data} parsedData={parsedData} />
            </div>
        </main>
    )
}