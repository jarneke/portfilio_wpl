import { blogCollection, connect, disconnect, likeCollection } from '@/config/db';
import { Blog, BlogWithLike, Like } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogWithLike | { message: string }>) {
    if (req.method === 'GET') {
        try {
            await connect();

            const blog: Blog | null = await blogCollection.findOne({ _id: new ObjectId(req.query.id as string) });
            const likes: Like[] = await likeCollection.find({ blogId: new ObjectId(req.query.id as string) }).toArray();
            if (blog) {
                const blogWithLikes: BlogWithLike = {
                    _id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date,
                    tags: blog.tags,
                    likes: likes.filter(like => like.state).length,
                    dislikes: likes.filter(like => !like.state).length,
                    liked: likes.filter(like => like.userEmail === req.query.userEmail as string).length === 1
                }
                res.status(200).json(blogWithLikes);
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