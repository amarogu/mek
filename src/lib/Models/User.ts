import mongoose from 'mongoose';
if (mongoose.models.User) {
    mongoose.deleteModel('User');
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
    }
});

export const User = mongoose.model('User', userSchema);