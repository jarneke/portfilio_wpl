import { blogCollection, commentCollection, commentLikeCollection, connect, disconnect, likeCollection } from '@/config/db';
import { Blog, BlogWithLikeAndComments, Comment, CommentLike, CommentWithLike, Like } from '@/types/types';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse<BlogWithLikeAndComments | { message: string }>) {
    const session = await getSession({ req });
    if (req.method === 'GET') {
        try {
            await connect();

            const blog: Blog | null = await blogCollection.findOne({ _id: new ObjectId(req.query.id as string) });
            if (!blog) return res.status(404).json({ message: 'No blog post found' });
            const likes: Like[] = await likeCollection.find({ blogId: blog?._id }).toArray();
            const comments: Comment[] = await commentCollection.find({ blogId: blog?._id }).toArray();
            const commentsWithLikes: CommentWithLike[] = await Promise.all(
                comments.map(async comment => {
                    const commentLikes: CommentLike[] = await commentLikeCollection.find({ commentId: comment._id }).toArray();
                    const likedByUser = commentLikes.filter(like => like.userEmail === session?.user?.email as string);
                    let liked: "like" | "dislike" | "none" = "none";
                    if (likedByUser.length > 0) {
                        liked = likedByUser[0].state;
                    }
                    return {
                        _id: comment._id,
                        blogId: comment.blogId,
                        userEmail: comment.userEmail,
                        content: comment.content,
                        date: comment.date,
                        likes: commentLikes.filter(like => like.state === "like").length,
                        dislikes: commentLikes.filter(like => like.state === "dislike").length,
                        liked: liked
                    };
                })
            );
            const likedByUser = likes.filter(like => like.userEmail === session?.user?.email as string);
            let liked: "like" | "dislike" | "none" = "none";
            if (likedByUser.length > 0) {
                liked = likedByUser[0].state;
            }
            if (blog) {
                const blogWithLikes: BlogWithLikeAndComments = {
                    _id: blog._id,
                    title: blog.title,
                    content: blog.content,
                    date: blog.date,
                    tags: blog.tags,
                    likes: likes.filter(like => like.state === "like").length,
                    dislikes: likes.filter(like => like.state === "dislike").length,
                    liked: liked,
                    comments: commentsWithLikes
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