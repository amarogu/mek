import { NextRequest } from "next/server";
import { Stripe } from 'stripe';
import { connectDb } from "@/lib/connect";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WH_SECRET as string;

export const config = {
    api: {
        bodyParser: false
    }
}

const handleSuccess = async (metadata: { _id: string, gift_id: string, msg: string }) => {
    const models = await connectDb();
    try {
        if (models) {
            const { User, Group, Msg, Purchase, Gift } = models;
            const user = await User.findById(metadata._id);
            const group = await Group.findById(metadata._id);
            const gift = await Gift.findById(metadata.gift_id);
            
            if (!gift) {
                return false
            } else {
                gift.soldOut = true;
                await gift.save();
                if (user) {
                    const message = new Msg({owner: user._id, content: metadata.msg});
                    const purchase = new Purchase({giftGiven: gift._id, msg: message._id});
                    await message.save();
                    await purchase.save();
                    user.purchases.push(purchase._id);
                    await user.save();
                    return true;
                }
                if (group) {
                    const message = new Msg({owner: group._id, content: metadata.msg});
                    const purchase = new Purchase({giftGiven: gift._id, msg: message._id});
                    await message.save();
                    await purchase.save();
                    group.purchases.push(purchase._id);
                    await group.save();
                    return true;
                }
                return false;
            }
        } else {
            return false;
        }
    } catch {
        return false;
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
            handleSuccess(e.data.object.metadata as { _id: string, gift_id: string, msg: string });
    }

    return Response.json({});
}