import mongoose from 'mongoose';
import { getGender } from '../helpers';
import { type User } from './User';
if (mongoose.models.Group) {
    mongoose.deleteModel('Group');
}

export type Group = {
    users: string[];
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
}

const groupSchema = new mongoose.Schema({
    users: {
        type: Array<mongoose.Schema.Types.ObjectId>,
        ref: 'User',
        default: []
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'gender-fluid']
    }
})

groupSchema.pre('save', function(next) {
   const users = this.users.prototype as User[];
   const genders = users.map(user => user.gender);
   const mostFrequentGender = getGender(genders);
   this.gender = mostFrequentGender;
   next();
});

export const Group = mongoose.model('Group', groupSchema);