import mongoose from 'mongoose';
import { getGender } from '../helpers';
import { type User } from './User';
if (mongoose.models.Group) {
    mongoose.deleteModel('Group');
}

export type Group = {
    users: string[] | User[];
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    name: string;
    link: string;
    _id: string;
    __v: number;
}

const groupSchema = new mongoose.Schema({
    users: {
        type: Array<mongoose.Schema.Types.ObjectId>,
        ref: 'User',
        default: []
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'gender-fluid']
    },
    link: {
        type: String
    }
})

groupSchema.pre('save', async function(next) {
    await this.populate('users');
    const users = this.users as unknown as User[];
    const mostFrequentGender = getGender(users.map(user => user.gender));
    this.gender = mostFrequentGender;
    this.link = `https://mariaekalil.com/${this._id}`;
    next();
 });

export const Group = mongoose.model('Group', groupSchema);