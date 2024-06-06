'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { PlainAdminData } from "@/lib/helpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { IGift, IMsg } from "@/lib/Models/Interfaces";
import { TabData } from "@/lib/helpers";
import Divider from "../Divider";
import SimpleInput from "../SimpleInput";
import Button from "../Button";
import { useRef } from "react";
import instance from "@/lib/axios";

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

    const fileInput = useRef<HTMLInputElement>(null);

    const handleClick = async () => {
        if (fileInput.current) console.log(fileInput.current.files?.item(0));
        const res = await instance.post('/newgift', {
            
        }, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        })
    }

    const tabClassName = 'data-[selected]:text-text-100 transition-colors focus:outline-none data-[selected]:dark:text-dark-text-100 text-text-100/75 dark:text-dark-text-100/75';

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
                            return <Tab key={i} className={tabClassName}>{tab}</Tab>
                        })
                    }
                    <Tab className={tabClassName}>Cadastrar presentes</Tab>
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
                                                                    entity[entityPath].length > 1 && i !== entity[entityPath].length - 1
                                                                    ?
                                                                        <div key={i} className="flex flex-col gap-4">
                                                                            <div key={i} className="flex flex-col gap-2">
                                                                                {renderPath(path)}
                                                                                <p className="text-text-100/75 dark:text-dark-text-100/75">{entity.name}</p>
                                                                            </div>
                                                                            <Divider />
                                                                        </div> 
                                                                    :
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
                    <TabPanel>
                        <div>
                            <form className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4">
                                <h2 className="text-xl font-bold">Cadastrar presente</h2>
                                <SimpleInput type="text" placeholder="Título" />
                                <SimpleInput type="text" placeholder="Descrição (ex: cozinha, casa, etc.)" />
                                <SimpleInput type="number" placeholder="Valor (BRL)" />
                                <div className="flex gap-4 items-center">
                                    <label>Imagem:</label>
                                    <SimpleInput ref={fileInput} type="file" />
                                </div>
                                <Button onClick={handleClick} text="Cadastrar" />
                            </form>
                        </div>
                    </TabPanel>
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