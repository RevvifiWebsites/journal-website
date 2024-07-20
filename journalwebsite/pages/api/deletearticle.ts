import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let user = await getUser(req);
    if(!user ||  !user.admin){
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    let artid = req.body.id as string;
    console.log(artid + "id");
    console.log(req.body);
    let article = await Prisma.article.delete({
        where: {
            id: artid,
        },
    });
    if(article){
        res.status(200).json({message: "Article deleted"});
    } else {
        res.status(404).json({message: "Article not found"});
    }
}
