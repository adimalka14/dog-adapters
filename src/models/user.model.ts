import { Schema, model, Model, Document } from 'mongoose';
import { IUser } from '../interfaces/user.interface';

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

userSchema.index({ email: 1 });

export const UserModel = model('User', userSchema);
