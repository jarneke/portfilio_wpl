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

export interface GitResponse {
    total_count: number
    incomplete_results: boolean
    items: Array<GitItem>
}

interface GitItem {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    user_view_type: string
    site_admin: boolean
    score: number
}