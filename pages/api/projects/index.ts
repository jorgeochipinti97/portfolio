import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProject } from '../../../interfaces'
import Project from '../../../models/Project';

type Data =
    | { message: string }
    | IProject
    | IProject[]


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createProject(req, res);
        case 'PUT':
            return updateProject(req, res);
        case 'GET':
            return getProjects(req, res);
        case 'DELETE':
            return deleteProject(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const createProject = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {

        await db.connect()
        const project = new Project(req.body)
        await project.save()
        await db.disconnect();

        res.status(201).json(project);
    } catch (err) {
        console.log(err)
    }

}


const updateProject = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {

        await db.connect()
        const { _id = '' } = req.body as IProject;

        if (!isValidObjectId(_id)) {
            return res.status(400).json({ message: 'El id del project no es válido' });
        }
        const project = await Project.findById(_id);
        if (!project) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un project con ese ID' });
        }

        await project.update(req.body)

        await db.disconnect();

        return res.status(200).json(project);

    } catch (err) {
        console.log(err)
    }

}

const getProjects = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();
    const project = await Project.find().lean()
    await db.disconnect();
    return res.status(200).json(project)

}


const deleteProject = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id = '',  } = req.body as IProject;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id del project no es válido' });
    }
    


    try {
        
        await db.connect();
        const project = await Project.findById(_id);
        if ( !project ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un project con ese ID' });
        }

        await Project.findByIdAndDelete({_id: _id})

        await db.disconnect();
        

        return res.status(200).json( {message: 'eliminado'} );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}