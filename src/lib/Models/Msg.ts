import mongoose from "mongoose";
if (mongoose.models.Msg) {
    mongoose.deleteModel("Msg");
}

export type Msg = {
    owner: string;
    content: string;
    _id: string;
    __v: number;
}

const msgSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" || "Group",
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

export const Msg = mongoose.model("Msg", msgSchema);