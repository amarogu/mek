import { deleteModel, Schema, models, model } from "mongoose";
import { IMsg } from "./Interfaces";

if (models.Msg) {
    deleteModel("Msg");
}

const msgSchema = new Schema<IMsg>({
    content: {
        type: String,
        required: true
    }
});

export const Msg = model<IMsg>("Msg", msgSchema);