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
    await Prisma.article.update({
        where: {
            id: artid,
        },
        data: {
            featured: true,
        },
    });
    res.status(200).json({message: "Success"});
}
