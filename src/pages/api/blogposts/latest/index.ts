import { blogCollection, connect, disconnect } from '@/config/db';
import { Blog } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Blog | { message: string }>) {
    if (req.method === 'GET') {
        try {
            await connect();
            const blog = await blogCollection.findOne({}, { sort: { date: -1 } })
            if (blog) {
                res.status(200).json(blog);
            } else {
                res.status(404).json({ message: 'No blog post found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while fetching blog posts' });
        } finally {
            await disconnect();
        }
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}