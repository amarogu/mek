import Input from "../Input";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { parseGender } from "@/lib/helpers";
import instance from "@/lib/axios";

export default function GroupForm() {

    const [groupName, setGroupName] = useState<string>('');
    const [users, setUsers] = useState<{name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid'}[]>([]);
    const [curr, setCurr] = useState<{name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid'}>({name: '', gender: 'male'});
    const [res, setRes] = useState<string>('');

    const handleSubmit = async (groupName: string, users: {name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid'}[]) => {
        if (!groupName) return setRes('Insira um nome para o grupo');
        if (!users.length) return setRes('Insira pelo menos um usuário');
        const res = (await instance.post('/registergroup', {name: groupName, users})).data.message as string;
        setRes(res);
        setGroupName('');
        setUsers([]);
    }

    return (
        <>
            <Input onChange={(e) => setGroupName(e.target.value)} value={groupName} type="text" id="name" placeholder="Nome do Grupo" />
            <div className="flex items-start flex-col gap-4">
                <div className="flex flex-col gap-4 w-full">
                    <Input onChange={(e) => setCurr({...curr, name: e.target.value})} value={curr.name} type="text" id="user" placeholder="Nome do Usuário" />
                    <div>
                        <Menu>
                            <MenuButton className="inline-flex items-center gap-2 rounded-sm w-full bg-bg-300 dark:bg-dark-bg-300 px-4 py-2 focus:outline-none data-[focus]:outline-1">Gênero: {parseGender(curr.gender)}</MenuButton>
                            <Transition enter="transition ease-out duration-75" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <MenuItems anchor="bottom start" className="w-52 origin-top-left backdrop-blur-sm rounded-sm mt-4 border border-white/5 bg-white/5 p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none">
                                    {(['male', 'female', 'non-binary', 'gender-fluid'] as ('male' | 'female' | 'non-binary' | 'gender-fluid')[]).map((g, i) => <MenuItem key={i}><button onClick={() => setCurr({...curr, gender: g})} className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-bg-300/10 dark:data-[focus]:bg-dark-bg-100/10">{parseGender(g)}</button></MenuItem>)}
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
                <button onClick={(e) => {e.preventDefault(); if (curr.name) { setUsers([...users, curr]); setRes(''); setCurr({gender: 'male', name: ''}) } else { setRes('Por favor insira um nome') }}} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">+</button>
            </div>
            {users.map((u, i) => (
                <div key={i} className="flex gap-4">
                    <p key={i} className="bg-bg-300 dark:bg-dark-bg-300 px-4 py-2 grow rounded-sm">{u.name}</p>
                    <div className="w-52">
                        <Menu>
                            <MenuButton className="inline-flex items-center gap-2 rounded-sm bg-bg-300 dark:bg-dark-bg-300 px-4 py-2 w-full focus:outline-none data-[focus]:outline-1">Gênero: {parseGender(u.gender)}</MenuButton>
                            <Transition enter="transition ease-out duration-75" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <MenuItems anchor="bottom start" className="w-52 origin-top-left backdrop-blur-sm rounded-sm mt-4 border border-white/5 bg-white/5 p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none">
                                    {(['male', 'female', 'non-binary', 'gender-fluid'] as ('male' | 'female' | 'non-binary' | 'gender-fluid')[]).map((g, gi) => <MenuItem key={gi}><button onClick={() => setUsers(users.map((user, userIndex) => userIndex === i ? {...user, gender: g} : user))} className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-bg-300/10 dark:data-[focus]:bg-dark-bg-100/10">{parseGender(g)}</button></MenuItem>)}
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); 
                            setUsers(users.filter((user, index) => index !== i))
                        }} 
                        className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">-
                    </button>
                </div>
            ))}
            <button onClick={(e) => {e.preventDefault(); handleSubmit(groupName, users)}} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">Cadastrar grupo</button>
            <p>{res}</p>
        </>
    )
}