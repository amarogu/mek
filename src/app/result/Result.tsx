import { useEffect, useState } from "react";
import {useStripe} from '@stripe/react-stripe-js';

export default function Result({clientSecret}: {clientSecret: string}) {
    const [message, setMessage] = useState<string | undefined>(undefined);

    const stripe = useStripe();

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
        <main>
            {message && <p>{message}</p>}
        </main>
    )
}