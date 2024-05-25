'use client';
import { Gift } from "@/lib/Models/Gift";
import instance from "@/lib/axios";
import { loadStripe } from '@stripe/stripe-js';
import 'dotenv/config';
import { useEffect, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { User } from "../../lib/Models/User";
import { Group } from "../../lib/Models/Group";
import Back from '../../../public/arrow_back.svg';
import BackDark from '../../../public/arrow_back_dark.svg';
import Image from "next/image";
import StyledInput from "@/app/StyledInput";
import Divider from "@/app/Divider";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Content({gift, item}: {gift: Gift, item?: User | Group}) {

    const [clientSecret, setClientSecret] = useState<string>('');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    useEffect(() => {
        instance.post('/payment', {_id: gift._id}).then(res => res.data).then((data: {clientSecret: string}) => setClientSecret(data.clientSecret));
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, []);

    return (
        <main className="p-8">
            <div className="flex flex-col gap-9">
                <section className="flex text-2xl flex-col gap-6">
                    <div className="flex gap-4 items-center">
                        <div className="p-4 bg-bg-200 dark:bg-dark-bg-200">
                            <Image src={isDarkMode ? BackDark : Back} alt="Voltar" />
                        </div>
                        <h2 className="uppercase font-bold">01. Seus dados</h2>
                    </div>
                    <div className="flex gap-6 flex-col">
                        <StyledInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email*" />
                        {item ? <div className="flex flex-col gap-4"><p className="uppercase text-2xl font-bold">Nome</p><p className={`uppercase origin-top-left text-2xl`}>{item.name}</p></div> : <StyledInput onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome*" />}
                    </div>
                </section>
                <Divider />
                <section className="flex text-2xl flex-col gap-6">
                    <h2 className="uppercase font-bold">02. Seu presente</h2>
                    <div className="flex flex-col gap-6 text-xl">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">{gift.title}</p>
                            <p className="text-text-100/75 dark:text-dark-text-100/75">Categoria: {gift.description}</p>
                        </div>
                        <p className="">BRL {gift.value}</p>
                    </div>
                </section>
                <Divider />
                <section className="flex flex-col gap-6 text-2xl">
                    <h2 className="uppercase font-bold">03. Deixe uma mensagem</h2>
                    <StyledInput type="text" placeholder="Mensagem" onChange={(e) => setMsg(e.target.value)} value={msg} />
                </section>
                <Divider />
                <section className="flex text-2xl flex-col gap-6">
                    <h2 className="uppercase font-bold">04. Forma de pagamento</h2>
                    {clientSecret && (
                        <Elements options={{appearance: {theme: 'stripe', variables: {colorText: isDarkMode ? '#FFFFFF' : '#333333', colorBackground: isDarkMode ? '#292929' : '#e8e8e8', colorPrimary: isDarkMode ? '#FFFFFF' : '#333333', colorDanger: '#F87171', borderRadius: '0px', spacingUnit: '5px'}, rules: {'.Label': {paddingBottom: '6px'}}}, locale: 'pt-BR', clientSecret, fonts: [{cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans'}]}} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </section>
            </div>
        </main>
    )
}