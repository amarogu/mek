'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import Result from './Result';
import { notFound } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Content() {

  const [clientSecret, setClientSecret] = useState<string>('');
    
  useEffect(() => {
    const urlSearchResult = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (urlSearchResult) setClientSecret(urlSearchResult);
    if (!urlSearchResult) notFound();
  }, [])
    
  return (
    <>
      {
        clientSecret &&
        <Elements stripe={stripePromise} options={{clientSecret, appearance: {theme: 'stripe'}}}>
          <Result clientSecret={clientSecret} />
        </Elements>
      }
    </>
  )
}