import { blogCollection, connect, disconnect } from '@/config/db';
import { Blog } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Blog | { message: string }>) {
    if (req.method === 'GET') {
        try {
            await connect();
            const blog = await blogCollection.findOne({ _id: new ObjectId(req.query.id as string) });
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
    } else if (req.method === 'DELETE') {
        try {
            await connect();
            const blog = await blogCollection.findOne({ _id: new ObjectId(req.query.id as string) });
            if (blog) {
                await blogCollection.deleteOne({ _id: new ObjectId(req.query.id as string) });
                res.status(200).json({ message: 'Blog post deleted successfully' });
            } else {
                res.status(404).json({ message: 'No blog post found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while deleting the blog post' });
        } finally {
            await disconnect();
        }
    }
    else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}