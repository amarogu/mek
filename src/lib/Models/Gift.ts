import mongoose from 'mongoose';
if (mongoose.models.Gift) {
    mongoose.deleteModel('Gift');
}

export interface IGift {
    title: string;
    description: string;
    value: number;
}

const giftSchema = new mongoose.Schema<IGift>({
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

export const Gift = mongoose.model<IGift>('Gift', giftSchema);