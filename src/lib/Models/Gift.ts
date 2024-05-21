import mongoose from 'mongoose';
if (mongoose.models.Gift) {
    mongoose.deleteModel('Gift');
}

export type Gift = {
    title: string;
    description: string;
    value: number;
    _id: string;
    __v: number;
}

const giftSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
});

export const Gift = mongoose.model('Gift', giftSchema);