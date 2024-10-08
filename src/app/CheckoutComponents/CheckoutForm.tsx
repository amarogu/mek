import { IGroup, IUser } from '@/lib/Models/Interfaces';
import { LeanDocument, Populated } from '@/lib/helpers';
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';

export default function CheckoutForm({item}: {item?: LeanDocument<IUser> | Populated<IGroup, {users: IUser[]}>}) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }
    
        setIsLoading(true);
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `http://localhost:3000/result?_id=${item?._id}&type=${'users' in item! ? 'group' : 'user'}`,
          },
        });
    
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
    
        setIsLoading(false);
      };

    return (
        <form id='payment-form' className='md:w-2/3  flex flex-col gap-6' onSubmit={(e) => handleSubmit(e)}>
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