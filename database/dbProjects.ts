import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IProject } from "../interfaces";
import Project from "../models/Project";

export const getAllProjects = async (): Promise<IProject[]> => {
    await db.connect();
    const projects = await Project.find().lean();
    await db.disconnect();


    return JSON.parse(JSON.stringify(projects));
}
export const getProjectsById = async (id_: string): Promise<IProject[] | null> => {
    if(!isValidObjectId(id_)){
        return null
    }

    await db.connect();
    const projects = await Project.findById(id_).lean()
    await db.disconnect();

    if(!projects){
        return null;
    }

    return JSON.parse(JSON.stringify(projects));
}