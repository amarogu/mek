import mongoose from 'mongoose';
import { Msg } from './Msg';
if (mongoose.models.User) {
    mongoose.deleteModel('User');
}

export type User = {
    name: string;
    msgs: string[];
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    link?: string;
    _id: string;
    __v: number;
    giftsGiven: string[];
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    msgs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: Msg,
        default: []
    },
    link: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'gender-fluid'],
        required: true
    },
    giftsGiven: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Gift',
        default: []
    }
});

userSchema.pre('save', function(next) {
    this.link = `https://mariaekalil.com/guest/${this._id}`;
    next();
});

userSchema.pre('insertMany', function(next, docs) {
    docs.forEach((doc: User) => {
        doc.link = `https://mariaekalil.com/guest/${doc._id}`;
    });
    next();
});

export const User = mongoose.model('User', userSchema);