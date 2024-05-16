import mongoose from "mongoose";
if (mongoose.models.Msg) {
    mongoose.deleteModel("Msg");
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