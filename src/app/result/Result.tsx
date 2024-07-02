import { useEffect, useState } from "react";
import {useStripe} from '@stripe/react-stripe-js';
import { renderIcon } from "@/lib/rendering/renderIcon";
import { parseMessage, renderPaymentResultDescription } from "@/lib/helpers";
import Link from "next/link";
import Back from '../../../public/arrow_back.svg';
import BackDark from '../../../public/arrow_back_dark.svg';
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function Result({clientSecret}: {clientSecret: string}) {
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const stripe = useStripe();

    const searchParams = useSearchParams();

    const id = searchParams.get('_id');
    const type = searchParams.get('type');

    useEffect(() => {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, [])

    useEffect(() => {
        if (!stripe) {
            return;
          }
      
          stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (!paymentIntent) {
              return;
            }
            switch (paymentIntent.status) {
              case "succeeded":
                setMessage("Payment succeeded!");
                break;
              case "processing":
                setMessage("Your payment is processing.");
                break;
              case "requires_payment_method":
                setMessage("Your payment was not successful, please try again.");
                break;
              default:
                setMessage("Something went wrong.");
                break;
            }
          });
    }, [stripe, clientSecret]);

    return (
        <main className="h-screen grid grid-rows-3 p-8 max-w-xl mx-auto items-center">
          <Link href={`${type === 'group' ? `/group/${id}` : `/guest/${id}`}`} className="p-4 bg-bg-200 self-start justify-self-start dark:bg-dark-bg-200">
            <Image src={isDarkMode ? BackDark : Back} alt="Voltar" />
          </Link>
          {message && (
            <div className="p-4 bg-bg-200 flex flex-col gap-4 w-full dark:bg-dark-bg-200">
              <div className="flex gap-5 items-center">
                {renderIcon(isDarkMode, message)}
                <h1 className="text-3xl md:text-4xl font-bold">{parseMessage(message)}</h1>
              </div>
              <p>{renderPaymentResultDescription(message)}</p>
            </div>
          )}
        </main>
    )
}