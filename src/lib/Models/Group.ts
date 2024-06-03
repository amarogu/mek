import mongoose, { HydratedArraySubdocument } from 'mongoose';
import { getGender } from '../helpers';
import { IUser } from './User';

if (mongoose.models.Group) {
    mongoose.deleteModel('Group');
}

export interface IGroup {
    users: mongoose.Types.ObjectId[];
    name: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    link?: string;
    msgs: mongoose.Types.ObjectId[];
    giftsGiven: mongoose.Types.ObjectId[];
}

const groupSchema = new mongoose.Schema<IGroup>({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
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
    },
    msgs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Msg',
        default: []
    },
    giftsGiven: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Gift',
        default: []
    }
})

groupSchema.pre('save', async function(next) {
    const populatedGroup = await this.populate<{ users: IUser[] }>('users');
    const users = populatedGroup.users;
    const mostFrequentGender = getGender(users.map(user => user.gender));
    this.gender = mostFrequentGender;
    this.link = `https://mariaekalil.com/group/${this._id}`;
    next();
 });

export const Group = mongoose.model<IGroup>('Group', groupSchema);