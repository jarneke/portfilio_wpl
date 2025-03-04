import { blogCollection, connect, disconnect, likeCollection } from '@/config/db';
import { Blog, BlogWithLike, Like } from '@/types/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogWithLike | { message: string }>) {
    if (req.method === 'GET') {
        try {
            await connect();
            const blog: Blog | null = await blogCollection.findOne({}, { sort: { date: -1 } })
            const likes: Like[] = await likeCollection.find({ blogId: blog?._id }).toArray();
            const likedByUser = likes.filter(like => like.userEmail === req.query.userEmail as string);
            let liked: "like" | "dislike" | "none" = "none";
            if (likedByUser.length > 0) {
                liked = likedByUser[0].state;
            }
            if (blog) {
                const blogWithLikes: BlogWithLike = {
                    _id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date,
                    tags: blog.tags,
                    likes: likes.filter(like => like.state).length,
                    dislikes: likes.filter(like => !like.state).length,
                    liked: liked
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
    } else {
        // Handle other HTTP methods
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}