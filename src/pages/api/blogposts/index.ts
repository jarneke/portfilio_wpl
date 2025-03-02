import { blogCollection, connect, disconnect, likeCollection } from '@/config/db';
import { Blog, BlogWithLike, Like } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogWithLike[] | { message: string }>) {
    if (req.method === 'GET') {
        try {
            await connect();
            let filter = {}
            if (req.query.tags && req.query.userEmail) {

                const tags = !Array.isArray(req.query.tags) ? req.query.tags.split(",") : req.query.tags;
                filter = { tags: { $all: tags } };

            }
            const blogs = await blogCollection.find(filter, { sort: { date: -1 } }).toArray()

            const blogsWithLikes: BlogWithLike[] = await Promise.all(
                blogs.map(async blog => {
                    const likes: Like[] = await likeCollection.find({ blogId: blog._id }).toArray();
                    const likedByUser = likes.filter(like => like.userEmail === req.query.userEmail as string);
                    let liked: "like" | "dislike" | "none" = "none";
                    if (likedByUser.length > 0) {
                        liked = likedByUser[0].state;
                    }
                    return {
                        _id: blog._id,
                        title: blog.title,
                        content: blog.content,
                        date: blog.date,
                        tags: blog.tags,
                        likes: likes.filter(like => like.state === "like").length,
                        dislikes: likes.filter(like => like.state === "dislike").length,
                        liked: liked
                    }
                })
            );
            res.status(200).json(blogsWithLikes);
        } catch (error) {
            res.status(500).json({ message: `An error occurred while fetching blog posts: ${error}` });
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