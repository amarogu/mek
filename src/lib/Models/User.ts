import mongoose, { HydratedDocument } from 'mongoose';
import bcrypt from 'bcrypt';

if (mongoose.models.User) {
    mongoose.deleteModel('User');
}

const saltRounds = 10;

export interface IUser {
    name: string;
    msgs: mongoose.Types.ObjectId[];
    link?: string;
    gender: 'male' | 'female' | 'non-binary' | 'gender-fluid';
    giftsGiven: mongoose.Types.ObjectId[];
    role: 'admin' | 'individual';
    password?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    msgs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Msg',
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
    },
    role: {
        type: String,
        enum: ['admin', 'individual'],
        default: 'individual'
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 64
    }
});

userSchema.pre('save', function(next) {
    this.link = `https://mariaekalil.com/guest/${this._id}`;
    if ((this.isNew || this.isModified('password')) && this.password) {
        bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                this.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

userSchema.pre('insertMany', function(next, docs) {
    docs.forEach((doc: HydratedDocument<IUser>) => {
        doc.link = `https://mariaekalil.com/guest/${doc._id}`;
    });
    next();
});

export const User = mongoose.model<IUser>('User', userSchema);