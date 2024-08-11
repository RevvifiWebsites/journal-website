
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import getUser from "@/lib/getuser";
import { list } from '@vercel/blob';
export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let user = await getUser(req);
    if(user?.admin){
        let stats = {
            articles: await Prisma.article.count(),
            unpublished: await Prisma.article.count({
                where: {
                    published: false,
                }
            }),
            facts: await Prisma.funFact.count(),
            unpublishedfacts: await Prisma.funFact.count({
                where: {
                    published: false,
                }
            }),
            numusers: await Prisma.user.count(),
        };
        res.status(200).json(stats);
    }
    else {
        res.status(403).json({ message: "Unauthorized" });
    }
}