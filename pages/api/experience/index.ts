import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IExperience } from '../../../interfaces';
import Experience from '../../../models/Experience';

type Data =
    | { message: string }
    | IExperience
    | IExperience[]


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createExperience(req, res);
        case 'DELETE':
            return deleteExperience(req, res);
        case 'PUT':
            return updateExperience(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const updateExperience = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {

        await db.connect()

        const { _id = '' } = req.body as IExperience;

        if (!isValidObjectId(_id)) {
            return res.status(400).json({ message: 'El id del experience no es válido' });
        }
        const experience = await Experience.findById(_id);
        if (!experience) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un experience con ese ID' });
        }

        await experience.update(req.body)

        await db.disconnect();

        return res.status(200).json(experience);

    } catch (err) {

        console.log(err)
    }

}
const createExperience = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect()
        const experience = new Experience(req.body)
        await experience.save()
        await db.disconnect();

        res.status(201).json(experience);
    } catch (err) {
        console.log(err)
    }
}

const deleteExperience = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', } = req.body as IExperience;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del experience no es válido' });
    }

    try {

        await db.connect();
        const experience = await Experience.findById(_id);
        if (!experience) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un experience con ese ID' });
        }

        await Experience.findByIdAndDelete({ _id: _id })

        await db.disconnect();


        return res.status(200).json({ message: 'eliminado' });

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}
