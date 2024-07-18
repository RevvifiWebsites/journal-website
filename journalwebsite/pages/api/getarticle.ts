
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import getUser from "@/lib/getuser";
export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let id = req.query.id as string;
    let article = await Prisma.article.findUnique({
        where: {
            id: id,
        }
    });
    if(article){
        res.status(200).json(article);
    }
    else {
        res.status(404).json({ message: "Article not found" });
    }
}
