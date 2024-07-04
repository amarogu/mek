import { models, Schema, model, Model } from 'mongoose';
import { getGender } from '../helpers';
import { IGroup, IUser } from './Interfaces';

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
    purchases: {
        type: [Schema.Types.ObjectId],
        ref: 'Purchase',
        default: []
    }
})

groupSchema.pre('save', async function(next) {
    const populatedGroup = await this.populate<{ users: IUser[] }>('users');
    const users = populatedGroup.users;
    const mostFrequentGender = getGender(users.map(user => user.gender));
    this.gender = mostFrequentGender;
    this.link = `https://mariaekalil.com/${this._id}`;
    next();
 });

export const Group = models.Group as Model<IGroup> || model<IGroup>('Group', groupSchema);