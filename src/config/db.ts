import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Blog, Comment, CommentLike, Like } from '@/types/types';

dotenv.config();

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');

const client = new MongoClient(MONGODB_URI);

const db = client.db('portfolio_wpl');

// -- collections --
export const blogCollection = db.collection<Blog>('blogs');
export const likeCollection = db.collection<Like>('likes');
export const commentCollection = db.collection<Comment>('comments');
export const commentLikeCollection = db.collection<CommentLike>('commentLikes');


let connected = false;

export const connect = async () => {
    try {
        await client.connect();
        connected = true;
    } catch (error) {
        console.error('Error connecting to the database', error);
    }
};

export const disconnect = async () => {
    try {
        await client.close();
        connected = false;
    } catch (error) {
        console.error('Error disconnecting from the database', error);
    }
};
