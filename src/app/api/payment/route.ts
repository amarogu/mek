import { Stripe } from 'stripe'
import { connectDb } from '@/lib/connect';
import { NextRequest } from 'next/server';
import 'dotenv/config';
import { Model } from 'mongoose';
import { IGift } from '@/lib/Models/Interfaces';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const calculateAmount = async (_id: string, Gift: Model<IGift>) => {
    const gift = await Gift.findById(_id);
    if (!gift) return false;
    if (gift.soldOut) return false;
    return {
        value: gift.value * 100,
        gift: gift
    };
}

export async function POST(req: NextRequest) {
    const models = await connectDb();
    if (models) {
        const { User, Group, Gift } = models;
        const body = await req.json() as { gift_id: string, _id: string, msg: string };
        const gift = await calculateAmount(body.gift_id, Gift);
        if (!gift) return Response.json({message: 'Gift not found or sold out'}, {status: 404});
        try {
            const user = await User.findById(body._id);
            const group = await Group.findById(body._id);
            if (user) {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: gift.value,
                    currency: 'brl',
                    metadata: {
                        _id: user._id.toString(),
                        gift_id: gift.gift._id.toString(),
                        msg: body.msg
                    }
                });
                return Response.json({clientSecret: paymentIntent.client_secret});
            }
            if (group) {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: gift.value,
                    currency: 'brl',
                    metadata: {
                        _id: group._id.toString(),
                        gift_id: gift.gift._id.toString(),
                        msg: body.msg
                    }
                });
                return Response.json({clientSecret: paymentIntent.client_secret});
            }
            return Response.json({message: 'Instance not found'}, {status: 404});
        } catch (e: any) {
            return Response.json({message: 'An error occurred', error: e});
        }
    } else {
        return Response.json({error: 'Database connection failed'}, {status: 500});
    }
}