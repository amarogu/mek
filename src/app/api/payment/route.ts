import { Stripe } from 'stripe'
import { connectDb } from '@/lib/connect';
import { Gift } from '@/lib/Models/Gift';
import { NextRequest } from 'next/server';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const calculateAmount = async (_id: string) => {
    await connectDb();
    const gift = await Gift.findById(_id);
    if (!gift) return false;
    return gift.value * 100;
}

export async function POST(req: NextRequest) {
    const body = await req.json() as { _id: string };
    const amount = await calculateAmount(body._id);
    if (!amount) return Response.json({message: 'Gift not found'}, {status: 404});
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'brl'
        });
        return Response.json({clientSecret: paymentIntent.client_secret});
    } catch (e: any) {
        return Response.json({message: 'An error occurred', error: e});
    }
}