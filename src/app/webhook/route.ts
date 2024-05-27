import { NextRequest } from "next/server";
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WH_SECRET as string;

export const config = {
    api: {
        bodyParser: false
    }
} 

export async function POST(req: NextRequest) {
    const sig = req.headers.get('stripe-signature');

    const buf = await req.arrayBuffer();

    let e;

    try {
        e = stripe.webhooks.constructEvent(Buffer.from(buf), sig!, endpointSecret)
    } catch (e: any) {
        return Response.json({message: 'Webhook error', error: e});
    }

    switch (e.type) {
        case 'payment_intent.succeeded':
            console.log(e.data.object);
    }

    return Response.json({});
}