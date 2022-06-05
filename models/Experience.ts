import mongoose, { Schema, model, Model } from 'mongoose';
import { IExperience } from '../interfaces';

const experienceSchema = new Schema({
    title: { type: String},
    subtitle: { type: String},
    image: [{ type: String}],
    body: { type: String},
    tags: [{ type: String}],
})

const Experience:Model<IExperience> = mongoose.models.Experience || model('Experience',experienceSchema);

export default Experience;