import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { password } = req.body;
    const ADMIN_PASS = process.env.ADMIN_PASS;

    if (!ADMIN_PASS) return res.status(500).json({ error: "Server misconfiguration" });

    if (password === ADMIN_PASS) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
}
