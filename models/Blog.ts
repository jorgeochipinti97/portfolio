import mongoose, { Schema, model, Model } from 'mongoose';
import { IBlog } from '../interfaces';

const blogSchema = new Schema({
    title: { type: String },
    subtitle: { type: String },
    image: [{ type: String }],
    body: { type: String },
    tags: [{ type: String }],
}, {
    timestamps: true
})

const Blog: Model<IBlog> = mongoose.models.Blog || model('Blog', blogSchema);

export default Blog;