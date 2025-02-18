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

export const tagOptions: string[] = [
    "new skill",
    "stuck on issue",
    "solving problems",
    "learning by doing",
    "real world experience",
    "first project",
    "debugging struggles",
    "mistake learned from",
    "time management",
    "working in a team",
    "adapting to challenges",
    "getting feedback",
    "gaining confidence",
    "workflow improvement",
    "mentorship experience",
];