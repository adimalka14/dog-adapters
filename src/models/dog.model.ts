import { Schema, model } from 'mongoose';
import { IDog } from '../interfaces/dog.interface';

const dogSchema = new Schema<IDog>(
    {
        race: String,
        gender: String,
        age: Number,
        vaccines: Number,
        behave: [String],
        name: String,
        status: String,
        owner: String,
    },
    { timestamps: true }
);

export const DogModel = model('Dog', dogSchema);
