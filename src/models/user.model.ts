import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { hashPassword } from '../utils/hashingPassword';

const userSchema = new Schema<IUser>(
    {
        first_name: { type: String, trim: true },
        last_name: { type: String, trim: true },
        gender: { type: String, trim: true },
        email: {
            type: String,
            unique: true,
            required: [true, 'you must provide an email'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'you must provide a password'],
            minlength: 4,
        },
        isAdmin: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    const user = this as Document & IUser;
    if (!user.isModified('password')) {
        return next();
    }

    try {
        user.password = await hashPassword(user.password);
        next();
    } catch (err) {
        next(err as Error);
    }
});

userSchema.index({ email: 1 });

export const UserModel = model('User', userSchema);
