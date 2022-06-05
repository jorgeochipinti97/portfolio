import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IBlog } from "../interfaces";
import Blog from "../models/Blog";

export const getAllBlog = async (): Promise<IBlog[]> => {
    await db.connect();
    const blog = await Blog.find().lean();
    await db.disconnect();


    return JSON.parse(JSON.stringify(blog));
}
export const getBlogById = async (_id: string): Promise<IBlog[] | null> => {
    if (!isValidObjectId(_id)) {
        return null
    }
    await db.connect();
    const blog = await Blog.findById(_id).lean()
    await db.disconnect();

    if (!blog) {
        return null;
    }
    console.log(blog)

    return JSON.parse(JSON.stringify(blog));
}