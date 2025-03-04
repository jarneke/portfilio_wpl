import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<{ isAdmin: boolean }>) {
    const session = await getSession({ req });

    if (session && session?.user?.email === process.env.ADMIN_EMAIL) {
        res.status(200).json({ isAdmin: true });
    } else {
        res.status(200).json({ isAdmin: false });
    }
}