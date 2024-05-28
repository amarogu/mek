import { Gift } from "@/lib/Models/Gift";
import { Group } from "@/lib/Models/Group";
import { Msg } from "@/lib/Models/Msg";
import { User } from "@/lib/Models/User";
import { NextRequest } from "next/server";
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WH_SECRET as string;

export const config = {
    api: {
        bodyParser: false
    }
}

const handleSuccess = async (metadata: { _id: string, gift_id: string, msg: string }) => {
    const user = await User.findById(metadata._id);
    const group = await Group.findById(metadata._id);
    const gift = await Gift.findById(metadata.gift_id);

    if (!gift) return false
    if (user) {
        user.giftsGiven.push(gift._id);
        const message = new Msg({owner: user._id, content: metadata.msg});
        await message.save();
        user.msgs.push(message._id);
        await user.save();
        return true;
    }
    if (group) {
        group.giftsGiven.push(gift._id);
        const message = new Msg({owner: group._id, content: metadata.msg});
        await message.save();
        group.msgs.push(message._id);
        await group.save();
        return true;
    }
    return false;
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