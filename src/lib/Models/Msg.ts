import { Schema, models, model, Model } from "mongoose";
import { IMsg } from "./Interfaces";

const msgSchema = new Schema<IMsg>({
    content: {
        type: String,
        required: true
    }
});

export const Msg = models.Msg as Model<IMsg> || model<IMsg>("Msg", msgSchema);