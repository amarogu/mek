import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();


    const [message, setMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!stripe) {
            return;
          }
      
          const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
          );
      
          if (!clientSecret) {
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000",
          },
        });
    
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
    
        setIsLoading(false);
      };

    return (
        <form id='payment-form' className='w-2/3 flex flex-col gap-6' onSubmit={(e) => handleSubmit(e)}>
            <PaymentElement options={{layout: 'tabs'}} />
            <button disabled={isLoading || !stripe || !elements} id="submit" className='px-8 overflow-hidden text-2xl relative uppercase font-bold text-center py-4 border transition-colors border-text-100 dark:border-dark-text-100'>
                <span id="button-text">
                {isLoading ? 'Enviando' : "Pagar"}
                </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}