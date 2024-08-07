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
    let id = req.body.id as string;
    await Prisma.article.update( {
        where: {
            id: id,
        },
        data: {
            published: req.body.unpublish ? false : true,
        },
    });
    res.status(200).json({message: "Article published"});
}
