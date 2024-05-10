import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { parseGender } from "@/lib/helpers";
import Input from "../Input";
import { Dispatch, SetStateAction } from 'react';

export default function GuestForm({setName, name, res}: {setName: Dispatch<SetStateAction<string>>, name: string, res: string}) {
    return (
        <>
            <Input onChange={(e) => setName(e.target.value)} value={name} type="text" id="name" placeholder="Nome(s)" />
            <div className="w-52">
                <Menu>
                    <MenuButton className="inline-flex items-center gap-2 rounded-sm bg-bg-300 dark:bg-dark-bg-300 py-1.5 px-3 focus:outline-none data-[focus]:outline-1">Gênero: {parseGender(gender)}</MenuButton>
                    <Transition enter="transition ease-out duration-75" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-100" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                        <MenuItems anchor="bottom start" className="w-52 origin-top-left backdrop-blur-sm rounded-sm mt-4 border border-white/5 bg-white/5 p-1 text-sm/6 [--anchor-gap:var(--spacing-1)] focus:outline-none">
                            {(['male', 'female', 'non-binary', 'gender-fluid'] as ('male' | 'female' | 'non-binary' | 'gender-fluid')[]).map(g => <MenuItem><button onClick={() => setGender(g)} className="group flex w-full items-center gap-2 rounded-sm py-1.5 px-3 data-[focus]:bg-bg-300/10 dark:data-[focus]:bg-dark-bg-100/10">{parseGender(g)}</button></MenuItem>)}
                        </MenuItems>
                    </Transition>
                </Menu>
            </div>
            <button onClick={(e) => {e.preventDefault(); handleSubmit(name, gender, multipleGuests)}} type="submit" className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">
                Cadastrar
            </button>
            <p>{res ?? ''}</p>
        </>
    )
}