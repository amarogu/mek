import mongoose from 'mongoose';
if (mongoose.models.User) {
    mongoose.deleteModel('User');
}

export type User = {
    name: string;
    msgs: string[];
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    multipleGuests: boolean;
    _id: string;
    __v: number;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    msgs: {
        type: Array<mongoose.Schema.Types.ObjectId>,
        ref: 'Msg',
        default: []
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'gender-fluid'],
        required: true
    },
    multipleGuests: {
        type: Boolean,
        required: true
    }
});

export const User = mongoose.model('User', userSchema);