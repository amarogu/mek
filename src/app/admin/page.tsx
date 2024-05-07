'use client'
import Input from "../Input";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { parseGender } from "@/lib/helpers";
import instance from "@/lib/axios";

export default function Home() {
    const [multipleGuests, setMultipleGuests] = useState<boolean>(false)
    const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'gender-fluid'>('male');
    const [res, setRes] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid', multipleGuests: boolean) => {
        if (!name) return setRes('Nome inválido');
        const res = await instance.get(`registerguest?name=${name}&gender=${gender}&multipleGuests=${multipleGuests}`);
        setRes(res.data.message);
    }

    return (
        <main className="flex p-8 items-center justify-center h-screen">
            <form className="p-8 flex flex-col gap-4 bg-bg-200 dark:bg-dark-bg-200 rounded-sm">
                <h1 className="text-2xl font-bold">Cadastro de convidados</h1>
                <Input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" placeholder="Nome(s)" />
                <div className="w-52">
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-sm bg-bg-300 dark:bg-dark-bg-300 py-1.5 px-3 focus:outline-none data-[focus]:outline-1">
                            Gênero: {parseGender(gender)}
                        </MenuButton>
                        <Transition
                        enter="transition ease-out duration-75"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        >
                        <MenuItems
                            anchor="bottom start"
                            className="w-52 origin-top-left backdrop-blur-sm rounded-sm mt-4 border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                        >
                            <MenuItem>
                            <button onClick={() => setGender('male')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                Masculino
                            </button>
                            </MenuItem>
                            <MenuItem>
                            <button onClick={() => setGender('female')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                
                                Feminino
                                
                            </button>
                            </MenuItem>
                            <MenuItem>
                            <button onClick={() => setGender('non-binary')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                
                                Não-binário
                                
                            </button>
                            </MenuItem>
                            <MenuItem>
                            <button onClick={() => setGender('gender-fluid')} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                
                                Gênero-fluído
                            </button>
                            </MenuItem>
                        </MenuItems>
                        </Transition>
                    </Menu>
                </div>
                <div className='flex flex-col gap-4'>
                    <button onClick={(e) =>{e.preventDefault(); setMultipleGuests(!multipleGuests)}} className='flex justify-between items-center gap-4'>
                        <p>Múltiplas pessoas?</p>
                        <div className={`${multipleGuests ? 'bg-primary-200 dark:bg-dark-primary-300' : 'bg-primary-100 dark:bg-dark-primary-200'} w-8 h-4 relative rounded-full`}>
                            <span className={`h-2 w-2 inline-block absolute ${multipleGuests ? 'right-0 dark:bg-dark-bg-300' : 'left-0'} -translate-y-1/2 mx-1 top-1/2  rounded-full bg-bg-300`}></span>
                        </div>
                    </button>
                </div>
                <button onClick={(e) => {e.preventDefault(); handleSubmit(name, gender, multipleGuests)}} type="submit" className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">
                    Cadastrar
                </button>
                <p>{res ?? ''}</p>
            </form>
        </main>
    )
}