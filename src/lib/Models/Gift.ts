import { Model, Schema, model, models } from 'mongoose';
import { IGift } from './Interfaces';

const giftSchema = new Schema<IGift>({
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

export const Gift = models.Gift as Model<IGift> || model<IGift>('Gift', giftSchema);