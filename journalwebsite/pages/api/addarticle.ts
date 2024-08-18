
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
        if(!req.body.file){
            res.status(400).json({ message: "No file" });
            return;
        }
        const article = await Prisma.article.create({
            data: {
                title: req.body.title,
                authorId: user.id,
                credit: req.body.authors || user.name,
                type: req.body.type,
            }
        });
            let blob = await  put(`articles/${article.id}`, req.body.file, {
                access: 'public',
                contentType: "application/pdf",
                cacheControlMaxAge: Infinity,
              });
              if(req.body.funfacts){
                for(let fact of req.body.funfacts){
                    if(fact.length > 0){
                    await Prisma.funFact.create({
                        data: {
                            articleId: article.id,
                            authorId: user.id,
                            content: fact,
                        }
                    });}
                }
              }
        res.status(200).json({ message: "Article created",  id:  article.id });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
}
