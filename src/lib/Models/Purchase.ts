import { Model, Schema, model, models } from "mongoose";
import { IPurchase } from "./Interfaces";

const purchaseSchema = new Schema<IPurchase>({
    giftGiven: {
        type: Schema.Types.ObjectId,
        ref: 'Gift',
        required: true
    },
    msg: {
        type: Schema.Types.ObjectId,
        ref: 'Msg',
        required: true
    }
});

export const Purchase = models.Purchase as Model<IPurchase> || model<IPurchase>('Purchase', purchaseSchema);