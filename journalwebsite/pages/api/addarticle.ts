
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import * as argon2 from "argon2";
import { sign } from 'jsonwebtoken';
import getUser from "@/lib/getuser";
import { put } from '@vercel/blob';
export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let user = await getUser(req);
    if(user){
        const article = await Prisma.article.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: user.id,
                credit: req.body.authors || user.name,
            }
        });
        if(req.body.file){
            console.log("file");
            let blob = await  put(`articles/${article.id}`, req.body.file, {
                access: 'public',
                contentType: "application/pdf"
              });
            console.log(blob);
        }
        res.status(200).json({ message: "Article created",  id:  article.id });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
}
