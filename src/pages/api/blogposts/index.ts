import { blogCollection, connect, disconnect } from '@/config/db';
import { Blog } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Blog[] | { message: string }>) {
    if (req.method === 'GET') {
        try {
            await connect();
            const blogs = await blogCollection.find().toArray()
            res.status(200).json(blogs);
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while fetching blog posts' });
        } finally {
            await disconnect();
        }
    } else if (req.method === 'POST') {
        try {
            await connect();
            const { title, content, tags } = req.body;
            // check if data is valid
            if (!title || !content || !tags) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const newBlog = await blogCollection.insertOne({
                _id: new ObjectId(),
                title,
                content,
                date: new Date(),
                tags
            });
            return res.status(201).json({ message: `new blog inserted with id: ${newBlog.insertedId.toHexString()}` });
        } catch (error) {
            res.status(500).json({ message: 'An error occurred while creating a new blog post' });
        } finally {
            await disconnect();
        }
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}