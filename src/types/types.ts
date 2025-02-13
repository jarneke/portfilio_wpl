import { ObjectId } from "mongodb";

export interface Blog {
    _id?: ObjectId;
    title: string;
    content: string;
    date: Date;
    tags: string[];
}

export interface BlogTagString {
    title: string;
    content: string;
    date: Date;
    tags: string;
}