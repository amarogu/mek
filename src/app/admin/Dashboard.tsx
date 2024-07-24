'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { AdminData } from "@/lib/helpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useRef, useState } from "react";
import GuestForm from "./GuestForm";
import GroupForm from "./GroupForm";
import GuestList from "./GuestList";
import GuestMessages from "./GuestMessages";
import ThemeImage from "../ThemeImage";
import Share from '../../../public/ios_share.svg';
import ShareDark from '../../../public/ios_share_dark.svg';
import {jsPDF} from 'jspdf';
import { Populated } from "@/lib/helpers";
import { IUser,IMsg, IPurchase, IGift } from "@/lib/Models/Interfaces";
import DashboardNav from "./DashboardNav";

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

    const guestListRef = useRef<HTMLDivElement>(null);

    const tabClassName = 'data-[selected]:text-text-100 transition-colors focus:outline-none data-[selected]:dark:text-dark-text-100 text-text-100/75 dark:text-dark-text-100/75';

    const handleExport = () => {
        const doc = new jsPDF();

        if (guestListRef.current) {
            doc.setFontSize(18);
            doc.text('Lista de convidados do casamento de Maria e Kalil', 20, 20);

            // Add content to the PDF
            doc.setFontSize(12);
            let yPosition = 30;

            parsedData.forEach(item => {
                if ('users' in item) {
                    // It's a group
                    doc.text(`${item.name}`, 20, yPosition);
                    yPosition += 7;
                    item.users.forEach(user => {
                        doc.text(`- ${user.name}`, 30, yPosition);
                        yPosition += 7;
                    });
                    yPosition += 3;
                } else {
                    // It's an individual
                    doc.text(`- ${item.name}`, 20, yPosition);
                    yPosition += 7;
                }

                // Add a new page if we're near the bottom
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }
            });

            let totalIndividualGuests: number = 0;
            let totalConfirmedGuests: number = 0;
            data.forEach(item => {
                if (!('users' in item)) {
                    let user = item as Populated<IUser, { msgs: IMsg[], purchases: Populated<IPurchase, {msg: IMsg, giftGiven: IGift}>[] }>
                    totalIndividualGuests++;
                    if (user.confirmed) totalConfirmedGuests++;
                }
            });

            doc.text(`Total de convidados confirmados: ${totalConfirmedGuests}`, 20, 260);
            doc.text(`Total de convidados: ${totalIndividualGuests}`, 20, 270);
            doc.text('Gerado em ' + new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'}), 20, 280);

            window.open(doc.output('bloburl'), '_blank');
        }
    }

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
                        <div ref={guestListRef} className="bg-bg-200 dark:bg-dark-bg-200 rounded-md p-4 flex flex-col gap-4">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold">Lista de convidados</h2>
                                <button onClick={handleExport}>
                                    <ThemeImage srcDark={ShareDark} srcLight={Share} alt="Exportar" />
                                </button>
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
            <DashboardNav />
            <DashboardContent data={data} parsedData={parsedData} />
        </div>
    )
}