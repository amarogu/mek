'use client';
import { Gift } from "@/lib/Models/Gift";
import instance from "@/lib/axios";
import { loadStripe } from '@stripe/stripe-js';
import 'dotenv/config';
import { useEffect, useRef, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { User } from "../../lib/Models/User";
import { Group } from "../../lib/Models/Group";
import Back from '../../../public/arrow_back.svg';
import BackDark from '../../../public/arrow_back_dark.svg';
import Image from "next/image";
import StyledInput from "@/app/StyledInput";
import Divider from "@/app/Divider";
import { ReactLenis } from "@studio-freight/react-lenis";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { SuccessResponse, ErrorResponse, emptyMsg } from "@/lib/helpers";
import Button from "../Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Content({gift, item}: {gift: Gift, item?: User | Group}) {

    const [clientSecret, setClientSecret] = useState<string>('');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [res, setRes] = useState<undefined | SuccessResponse | ErrorResponse>(undefined);
    const [clicked, setClicked] = useState<boolean>(false);

    const info = useRef<HTMLDivElement>(null);
    const payment = useRef<HTMLDivElement>(null);

    const tl = useRef<GSAPTimeline | null>();

    const { contextSafe } = useGSAP();

    useEffect(() => {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, []);

    const cleanup = () => {
        setRes(undefined);
        setClicked(false);
    }

    const handleClick = async () => {
        setClicked(true);
        if (!msg) {
            return setRes(emptyMsg);
        }
        const res = await instance.post('/payment', {gift_id: gift._id, _id: item?._id, msg: msg});
        setClientSecret(res.data.clientSecret);
        setRes({message: 'Intent successfully generated'});
    }

    const onCompletion = contextSafe(() => {
        tl.current = gsap.timeline({onComplete: () => {
            if (tl.current?.reversed()) {
                payment.current?.setAttribute('style', 'z-index: -10; opacity: 0');
            } else {
                info.current?.setAttribute('style', 'z-index: -20; opacity: 0');
            }
        }}).to(info.current, {opacity: 0}).to(payment.current, {opacity: 1});
    });

    const goBack = contextSafe(() => {
        setClientSecret('');
        tl.current?.reverse();
    })

    return (
        <ReactLenis root>
            <main className="p-8 relative container mx-auto">
                <div ref={info} className="flex absolute w-full p-8 top-0 left-0 flex-col gap-12">
                    <section className="flex text-2xl flex-col gap-12">
                        <div className="flex gap-4 items-center">
                            <Link href={`${item ? 'users' in item ? `/group/${item._id}` : `/guest/${item._id}` : '/'}`} className="p-4 bg-bg-200 dark:bg-dark-bg-200">
                                <Image src={isDarkMode ? BackDark : Back} alt="Voltar" />
                            </Link>
                            <h2 className="uppercase font-bold">01. Seus dados</h2>
                        </div>
                        <div className="flex gap-6 md:gap-0 flex-col md:flex-row">
                            {item ? <div className="flex flex-col md:w-1/2 gap-4"><p className="uppercase text-2xl font-bold">Nome</p><p className={`uppercase origin-top-left text-2xl`}>{item.name}</p></div> : <StyledInput className="md:w-1/2" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Nome*" />}
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
                            <p className="">BRL {gift.value.toFixed(2)}</p>
                        </div>
                    </section>
                    <Divider />
                    <section className="flex flex-col gap-6 text-2xl">
                        <h2 className="uppercase font-bold">03. Deixe uma mensagem</h2>
                        <StyledInput res={res} type="text" placeholder="Mensagem" onChange={(e) => setMsg(e.target.value)} value={msg} />
                    </section>
                    <Button clicked={clicked} onComplete={onCompletion} cleanup={cleanup} onClick={handleClick} text="Próximo" res={res}  />
                </div>
                <div ref={payment} className="flex -z-10 left-0 p-8 opacity-0 absolute top-0 w-full flex-col gap-12">
                    <section className="flex flex-col gap-6">
                        <div className="flex gap-4 items-center">
                            <button onClick={goBack} className="p-4 h-[57px] bg-bg-200 dark:bg-dark-bg-200">
                                <Image src={isDarkMode ? BackDark : Back} alt="Voltar" />
                            </button>
                            <h2 className="uppercase text-2xl font-bold">04. Pagamento</h2>
                        </div>
                        <Divider />
                        <h3 className="uppercase flex justify-between text-xl font-bold">
                            <p>Total:</p>
                            <p>R${gift.value.toFixed(2)}</p>
                        </h3>
                        <Divider />
                        {clientSecret && (
                            <Elements options={{appearance: {theme: 'stripe', variables: {colorText: isDarkMode ? '#FFFFFF' : '#333333', fontFamily: 'Manrope', colorBackground: isDarkMode ? '#292929' : '#e8e8e8', colorPrimary: isDarkMode ? '#FFFFFF' : '#333333', colorDanger: '#F87171', fontSmooth: 'always', borderRadius: '0px', spacingUnit: '5px'}, rules: {'.Label': {paddingBottom: '6px'}}}, locale: 'pt-BR', clientSecret, fonts: [{cssSrc: 'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap'}]}} stripe={stripePromise}>
                                <CheckoutForm item={item} />
                            </Elements>
                        )}
                    </section>
                </div>
            </main>
        </ReactLenis>
    )
}