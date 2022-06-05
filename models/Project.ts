import mongoose, { Schema, model, Model } from 'mongoose';

import { IProject } from '../interfaces';

const projectSchema = new Schema({
    title: { type: String},
    description: { type: String},
    image: [{ type: String}],
    tags: [{ type: String}],
    github: { type: String},
    link: { type: String},
    section: [{
        step   : { type: String, required: true },
        title   : { type: String, required: true },
        body    : { type: String, required: true },
        image: { type: String, required: true },
    }]

})

const Project:Model<IProject> = mongoose.models.Project || model('Project',projectSchema);

export default Project;