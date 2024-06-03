import mongoose from "mongoose";

if (mongoose.models.Msg) {
    mongoose.deleteModel("Msg");
}

export interface IMsg {
    owner: mongoose.Types.ObjectId;
    content: string;
}

const msgSchema = new mongoose.Schema<IMsg>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' || 'Group',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export const Msg = mongoose.model<IMsg>("Msg", msgSchema);