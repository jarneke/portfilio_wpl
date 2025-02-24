import { blogCollection, connect, disconnect, likeCollection } from '@/config/db';
import { Blog, Like } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Like[] | Like | { message: string }> | any) {
    if (req.method === 'POST') {
        try {
            const { blogId, userEmail, like } = req.query;
            if (!blogId || !userEmail || !like) {
                return res.status(400).json({ message: 'Invalid data' });
            }
            const newLike = await likeCollection.insertOne({ _id: new ObjectId, blogId: new ObjectId(blogId as string), userEmail: userEmail as string, state: like === "true" });
            return res.status(201).json({ message: `new like inserted with id: ${newLike.insertedId.toHexString()}` });

        } catch (error) {
            return res.status(500).json({ message: 'An error occurred while inserting the like' });
        }
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}