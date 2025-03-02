import { blogCollection, connect, disconnect, likeCollection } from '@/config/db';
import { Blog, Like } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Like[] | Like | { message: string }> | any) {
    if (req.method === 'POST') {
        try {
            await connect();
            const { blogId, userEmail, state } = req.body;
            if (!blogId || !userEmail || !state) {
                return res.status(400).json({ message: `Invalid data: { blogId: ${blogId}, userEmail: ${userEmail}, like: ${state} }` });
            }
            if (state === "none") {
                const removeLike = await likeCollection.deleteMany({ blogId: new ObjectId(blogId as string), userEmail: userEmail as string });
                return res.status(200).json({ message: `${removeLike.deletedCount} removed` });
            } else if (state === "like") {
                await likeCollection.deleteMany({ blogId: new ObjectId(blogId as string), userEmail: userEmail as string, state: 'dislike' });
                const newLike = await likeCollection.insertOne({ _id: new ObjectId, blogId: new ObjectId(blogId as string), userEmail: userEmail as string, state: 'like' });
                return res.status(201).json({ message: `new like inserted with id: ${newLike.insertedId.toHexString()}` });
            } else if (state === "dislike") {
                await likeCollection.deleteMany({ blogId: new ObjectId(blogId as string), userEmail: userEmail as string, state: 'like' });
                const newLike = await likeCollection.insertOne({ _id: new ObjectId, blogId: new ObjectId(blogId as string), userEmail: userEmail as string, state: 'dislike' });
                return res.status(201).json({ message: `new dislike inserted with id: ${newLike.insertedId.toHexString()}` });
            } else {
                return res.status(400).json({ message: `Invalid data: { blogId: ${blogId}, userEmail: ${userEmail}, like: ${state} }` });
            }

        } catch (error) {
            return res.status(500).json({ message: `An error occurred while inserting the like: ${error}` });
        } finally {
            await disconnect();
        }
    } else if (req.method === 'GET') {
        try { await connect(); } catch { } finally { await disconnect(); }
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}