import Input from "../Input";
import { useState } from "react";

export default function GroupForm() {

    const [groupName, setGroupName] = useState<string>('');
    const [users, setUsers] = useState<string[]>([]);
    const [curr, setCurr] = useState<string>('');

    return (
        <>
            <Input onChange={(e) => setGroupName(e.target.value)} value={groupName} type="text" id="name" placeholder="Nome do Grupo" />
            <div className="flex gap-4">
                <Input onChange={(e) => setCurr(e.target.value)} type="text" id="user" className="grow" placeholder="Nome do Usuário" />
                <button onClick={(e) => {e.preventDefault(); setUsers([...users, curr])}} className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">+</button>
            </div>
            {users.map((u, i) => (
                <div className="flex gap-4">
                    <p key={i} className="bg-bg-300 dark:bg-dark-bg-300 px-4 py-2 grow rounded-sm">{u}</p>
                    <button 
                        onClick={(e) => {
                            e.preventDefault(); 
                            setUsers(users.filter((user, index) => index !== i))
                        }} 
                        className="text-left bg-accent-100 dark:bg-dark-accent-100 px-4 py-2 rounded-sm focus:outline outline-offset-2 outline-accent">-
                    </button>
                </div>
            ))}
        </>
    )
}