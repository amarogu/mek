'use client';
import { Gift } from "@/lib/Models/Gift";
import instance from "@/lib/axios";
import { loadStripe } from '@stripe/stripe-js';
import 'dotenv/config';
import { useEffect, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm";
import { Manrope } from "next/font/google";

const manrope = Manrope({subsets: ["latin"]});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Content({gift}: {gift: Gift}) {

    const [clientSecret, setClientSecret] = useState<string>('');
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        instance.post('/payment', {_id: gift._id}).then(res => res.data).then((data: {clientSecret: string}) => setClientSecret(data.clientSecret));
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, []);

    return (
        <main className="h-screen p-8">
            {clientSecret && (
                <Elements options={{appearance: {theme: 'stripe', variables: {colorText: isDarkMode ? '#FFFFFF' : '#333333', colorBackground: isDarkMode ? '#292929' : '#e8e8e8', colorPrimary: isDarkMode ? '#FFFFFF' : '#333333', colorDanger: '#F87171', borderRadius: '0px', spacingUnit: '5px'}, rules: {'.Label': {paddingBottom: '6px'}}}, locale: 'pt-BR', clientSecret, fonts: [{cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans'}]}} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </main>
    )
}