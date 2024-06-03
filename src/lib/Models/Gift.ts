import { deleteModel, Schema, model, models } from 'mongoose';
import { IGift } from './Interfaces';

if (models.Gift) {
    deleteModel('Gift');
}

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

export const Gift = model<IGift>('Gift', giftSchema);