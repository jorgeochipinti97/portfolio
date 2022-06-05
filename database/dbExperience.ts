import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IExperience } from "../interfaces";
import Experience from "../models/Experience";

export const getAllExperience = async (): Promise<IExperience[]> => {
    await db.connect();
    const experience = await Experience.find().lean();
    await db.disconnect();


    return JSON.parse(JSON.stringify(experience));
}
export const getExperienceById = async (id_: string): Promise<IExperience[] | null> => {
    if(!isValidObjectId(id_)){
        return null
    }

    await db.connect();
    const experience = await Experience.findById(id_).lean()
    await db.disconnect();

    if(!experience){
        return null;
    }

    return JSON.parse(JSON.stringify(experience));
}