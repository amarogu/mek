'use client';
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { AdminData, ErrorResponse, LeanDocument, Populated, SuccessResponse, emptyMsg } from "@/lib/helpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { IGift, IGroup, IMsg, IPurchase, IUser } from "@/lib/Models/Interfaces";
import { TabData } from "@/lib/helpers";
import Divider from "../Divider";
import SimpleInput from "../SimpleInput";
import Button from "../Button";
import { useRef } from "react";
import instance from "@/lib/axios";
import { useState } from "react";
import GuestForm from "./GuestForm";
import GroupForm from "./GroupForm";

const renderPath = (path: LeanDocument<IMsg> | Populated<IPurchase, {msg: IMsg, giftGiven: IGift}>) => {
    if ('content' in path) {
        return (
            <p>
                {path.content}
            </p>
        )
    } else {
        return (
            <div className="flex flex-col gap-2">
                <p>{path.giftGiven.title}</p>
                <p className="text-text-100/75 dark:text-dark-text-100/75">{path.giftGiven.description}</p>
                <p className="text-text-100/75 dark:text-dark-text-100/75">R$ {path.giftGiven.value}</p>
                <div className="flex flex-col gap-2 bg-bg-200 dark:bg-dark-bg-200 p-4">
                    <p className="text-text-100/75 dark:text-dark-text-100/75">Mensagem</p>
                    <p>{path.msg.content}</p>
                </div>
            </div>
        )
    }
}

const renderDashboard = (data: AdminData) => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [value, setValue] = useState<number | string>('');
    const [res, setRes] = useState<SuccessResponse | ErrorResponse | undefined>(undefined);
    const [clicked, setClicked] = useState(false);

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

    const fileInput = useRef<HTMLInputElement>(null);

    const cleanup = () => {
        setRes(undefined);
        setClicked(false);
    }

    const handleClick = async () => {
        setClicked(true);
        if (fileInput.current && title && desc && value) {
            const res = await instance.post('/newgift', {
                title,
                description: desc,
                value,
                image: fileInput.current.files?.item(0)
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.status !== 200) {
                return setRes(undefined);
            };
            if (res.data.error) {
                return setRes(res.data as ErrorResponse);
            }
            return setRes(res.data as SuccessResponse);
        } else {
            setRes(emptyMsg);
        }
    }

    const tabClassName = 'data-[selected]:text-text-100 transition-colors focus:outline-none data-[selected]:dark:text-dark-text-100 text-text-100/75 dark:text-dark-text-100/75';

    const tabs: TabData[] = [
        {
            tab: 'Mensagens',
            entityPath: 'msgs'
        },
        {
            tab: 'Presentes',
            entityPath: 'purchases'
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
                    <Tab className={tabClassName}>Cadastrar convidados</Tab>
                    <Tab className={tabClassName}>Confirmação dos convidados</Tab>
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
                                <SimpleInput value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Título *" />
                                <SimpleInput value={desc} onChange={(e) => setDesc(e.target.value)} type="text" placeholder="Descrição (ex: cozinha, casa, etc.) *" />
                                <SimpleInput value={value} onChange={(e) => {
                                    if (Number(e.target.value)) {
                                        setValue(Number(e.target.value));
                                    } else {
                                        setValue(e.target.value);
                                    }
                                }} type="number" placeholder="Valor (BRL) *" />
                                <div className="flex gap-4 items-center">
                                    <label>Imagem *:</label>
                                    <SimpleInput ref={fileInput} type="file" />
                                </div>
                                <Button clicked={clicked} cleanup={cleanup} res={res} onClick={handleClick} text="Cadastrar" />
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            <form className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <button onClick={(e) => {e.preventDefault(); setState('selection')}} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">Voltar</button>
                                    <h1 className="text-2xl font-bold">Cadastro de convidados</h1>
                                </div>
                                {renderContent(state)}
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Lista de convidados</h2>
                            {
                               data.map(e => {
                                /*if ('users' in e) {
                                    return (
                                        <div key={e._id} className="bg-bg-300 dark:bg-dark-bg-300 p-4 flex flex-col gap-4">
                                            <p className="text-xl font-bold">{e.name}</p>
                                            {
                                                e.users.map(u => {
                                                    return (
                                                        <div key={u._id} className="bg-bg-200 dark:bg-dark-bg-200 p-4 flex flex-col gap-4">
                                                            <p>{u.name}</p>
                                                            <p>{u.confirmed ? 'Confirmou' : 'Não confirmou'}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                } else {
                                    const user = e as Populated<IUser, { msgs: IMsg[], purchases: Populated<IPurchase, {msg: IMsg, giftGiven: IGift}>[] }>
                                    return (
                                        <div key={user._id} className="bg-bg-300 dark:bg-dark-bg-300 p-4 flex flex-col gap-4">
                                            <p className="text-xl font-bold">{user.name}</p>
                                            <p>{user.confirmed ? 'Confirmado' : 'Não confirmou'}</p>
                                        </div>
                                    )
                                }*/
                               return <></>
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