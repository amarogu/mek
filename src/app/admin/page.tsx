'use client'
import { useState } from "react";

import instance from "@/lib/axios";

export default function Home() {
    const [multipleGuests, setMultipleGuests] = useState<boolean>(false)
    const [gender, setGender] = useState<'male' | 'female' | 'non-binary' | 'gender-fluid'>('male');
    const [res, setRes] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleSubmit = async (name: string, gender: 'male' | 'female' | 'non-binary' | 'gender-fluid', multipleGuests: boolean) => {
        if (!name) return setRes('Nome inválido');
        console.log(instance.getUri());
        const res = await instance.get(`registerguest?name=${name}&gender=${gender}&multipleGuests=${multipleGuests}`);
        setRes(res.data.message);
    }

    return (
        <main className="flex p-8 items-center justify-center h-screen">
            <form className="p-8 flex flex-col gap-4 bg-bg-200 dark:bg-dark-bg-200 rounded-sm">
                <h1 className="text-2xl font-bold">Cadastro de convidados</h1>
                
            </form>
        </main>
    )
}