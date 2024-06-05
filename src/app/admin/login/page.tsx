'use client';
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import StyledInput from "@/app/StyledInput";
import { AuthRes } from "@/lib/helpers";

export default function App() {

    const router = useRouter();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState<AuthRes | undefined>(undefined);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                name, password, redirect: false 
            })
            if (res?.error) {
                setRes(new AuthRes('Invalid credentials', 401));
            }
            router.replace('/admin');
        } catch(err: any) {
            console.log(err);
        }
    }

    

    return (
        <main className="h-screen flex items-center justify-center p-8">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6 w-full sm:w-2/3 md:w-1/3 bg-bg-200 p-8 dark:bg-dark-bg-200">
                <h1 className="text-2xl font-bold">Login</h1>
                <StyledInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" type="text"  />
                <StyledInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" type="password"  />
                <button type="submit" className={`px-8 overflow-hidden text-2xl relative uppercase font-bold text-center py-4 border transition-colors ${res?.status === 401 ? 'border-red-400' : 'border-text-100 dark:border-dark-text-100'}`}>Login</button>
                <p>{res?.message}</p>
            </form>
        </main>
    )
}