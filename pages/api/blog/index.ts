import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IBlog } from '../../../interfaces';
import Blog from '../../../models/Blog';

type Data =
    | { message: string }
    | IBlog
    | IBlog[]


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createBlog(req, res);
        case 'DELETE':
            return deleteBlog(req, res);
        case 'PUT':
            return updateBlog(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const createBlog = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        await db.connect()
        const experience = new Blog(req.body)
        await experience.save()
        await db.disconnect();

        res.status(201).json(experience);
    } catch (err) {
        console.log(err)
    }
}

const deleteBlog = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { _id = '', } = req.body as IBlog;

    if (!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del blog no es válido' });
    }

    try {

        await db.connect();
        const blog = await Blog.findById(_id);
        if (!blog) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un blog con ese ID' });
        }

        await Blog.findByIdAndDelete({ _id: _id })

        await db.disconnect();


        return res.status(200).json({ message: 'eliminado' });

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const updateBlog = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {

        await db.connect()

        const { _id = '' } = req.body as IBlog;

        if (!isValidObjectId(_id)) {
            return res.status(400).json({ message: 'El id del blog no es válido' });
        }
        const blog = await Blog.findById(_id);
        if (!blog) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un blog con ese ID' });
        }

        await blog.update(req.body)

        await db.disconnect();

        return res.status(200).json(blog);

    } catch (err) {

        console.log(err)
    }

}