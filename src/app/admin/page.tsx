'use client'

import GuestForm from "./GuestForm"

export default function Home() {
    return (
        <main className="flex p-8 items-center justify-center h-screen">
            <form className="p-8 flex flex-col gap-4 bg-bg-200 dark:bg-dark-bg-200 rounded-sm">
                <h1 className="text-2xl font-bold">Cadastro de convidados</h1>
                <GuestForm />
            </form>
        </main>
    )
}