import { Stripe } from 'stripe'
import { connectDb } from '@/lib/connect';
import { Gift } from '@/lib/Models/Gift';
import { NextRequest } from 'next/server';
import 'dotenv/config';
import { User } from '@/lib/Models/User';
import { Group } from '@/lib/Models/Group';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const calculateAmount = async (_id: string) => {
    await connectDb();
    const gift = await Gift.findById(_id);
    if (!gift) return false;
    if (gift.soldOut) return false;
    return {
        value: gift.value * 100,
        gift: gift
    };
}

export async function POST(req: NextRequest) {
    const body = await req.json() as { gift_id: string, _id: string, msg: string };
    const gift = await calculateAmount(body.gift_id);
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
}