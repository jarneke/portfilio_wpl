import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.admin_token;

    if (!token) {
        console.log("No token found");
        return res.status(200).json({ isAuthenticated: false });
    }

    try {
        if (!SECRET_KEY) {
            console.log("JWT_SECRET is not defined");
            throw new Error("JWT_SECRET is not defined");
        }
        jwt.verify(token, SECRET_KEY);
        res.status(200).json({ isAuthenticated: true });
    } catch (error) {
        res.status(200).json({ isAuthenticated: false });
    }
}
