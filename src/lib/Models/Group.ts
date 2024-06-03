import { models, Types, Schema, model, deleteModel } from 'mongoose';
import { getGender } from '../helpers';
import { IUser } from './User';

if (models.Group) {
    deleteModel('Group');
}

export interface IGroup {
    users: Types.ObjectId[];
    name: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    link?: string;
    msgs: Types.ObjectId[];
    giftsGiven: Types.ObjectId[];
}

const groupSchema = new Schema<IGroup>({
    users: {
        type: [Schema.Types.ObjectId],
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
        type: [Schema.Types.ObjectId],
        ref: 'Msg',
        default: []
    },
    giftsGiven: {
        type: [Schema.Types.ObjectId],
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

export const Group = model<IGroup>('Group', groupSchema);