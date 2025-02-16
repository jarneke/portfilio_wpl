import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { password } = req.body;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    if (!ADMIN_PASS) return res.status(500).json({ error: "Server misconfiguration" });

    if (password !== ADMIN_PASS) {
        return res.status(200).json({ error: "Unauthorized" });
    }

    // Create JWT token
    const token = jwt.sign({ isAdmin: true }, SECRET_KEY, { expiresIn: "1h" });

    // Set HttpOnly cookie
    res.setHeader(
        "Set-Cookie",
        serialize("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        })
    );

    res.status(200).json({ success: true });
}
