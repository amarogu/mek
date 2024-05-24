import { useEffect, useState } from "react";
import {useStripe} from '@stripe/react-stripe-js';
import { renderIcon } from "@/lib/actions/renderIcon";
import { parseMessage } from "@/lib/helpers";

export default function Result({clientSecret}: {clientSecret: string}) {
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const stripe = useStripe();

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
    }, [stripe]);

    return (
        <main className="h-screen flex items-center">
            {message && (
              <div className="p-4 bg-bg-200 md:w-2/3 max-w-xl mx-auto dark:bg-dark-bg-200">
                <div className="flex gap-5 items-center">
                  {renderIcon(isDarkMode, message)}
                  <h1 className="text-3xl md:text-4xl font-bold">{parseMessage(message)}</h1>
                </div>
              </div>
            )}
        </main>
    )
}