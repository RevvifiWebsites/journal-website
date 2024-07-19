import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let user = await getUser(req);
    if(user){
        const comment = await Prisma.comment.create({
            data: {
                content: req.body.content,
                authorId: user.id,
                articleId: req.body.articleId,
                authorName: user.name
            }
        });
        res.status(200).json({ message: "Comment created",  id:  comment.id });
    }
    else {
        res.status(401).json({ message: "Not logged in" });
    }
}
