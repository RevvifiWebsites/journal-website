
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import * as argon2 from "argon2";
import { sign } from 'jsonwebtoken';
import getUser from "@/lib/getuser";
export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let user = await getUser(req);
    if(user){
        await Prisma.article.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: user.id
            }
        });
        res.status(200).json({ message: "Article created" });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
}
