import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { parseGender } from "@/lib/helpers";
import Input from "../Input";
import { useState } from 'react';
import instance from '@/lib/axios';

export default function GuestForm() {

    const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'gender-fluid'>('male');
    const [res, setRes] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid') => {
        if (!name) return setRes('Nome inválido');
        console.log(instance.getUri());
        const res = await instance.get(`registerguest?name=${name}&gender=${gender}`);
        setRes(res.data.message);
    }

    return (
        <>
            <Input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" placeholder="Nome" />
            <div className="w-52">
                <Menu>
                    <MenuButton className="inline-flex items-center gap-2 rounded-sm bg-bg-300 dark:bg-dark-bg-300 py-1.5 px-3 focus:outline-none data-[focus]:outline-1">Gênero: {parseGender(gender)}</MenuButton>
                    <Transition enter="transition ease-out duration-75" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <MenuItems anchor="bottom start" className="w-52 origin-top-left backdrop-blur-sm rounded-sm mt-4 border border-white/5 bg-white/5 p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none">
                            {(['male', 'female', 'non-binary', 'gender-fluid'] as ('male' | 'female' | 'non-binary' | 'gender-fluid')[]).map((g, i) => <MenuItem key={i}><button onClick={() => setGender(g)} className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-bg-300/10 dark:data-[focus]:bg-dark-bg-100/10">{parseGender(g)}</button></MenuItem>)}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
            <button onClick={(e) => {e.preventDefault(); handleSubmit(name, gender)}} type="submit" className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">
                Cadastrar
            </button>
            <p>{res ?? ''}</p>
        </>
    )
}