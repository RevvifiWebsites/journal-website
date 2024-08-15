import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let user = await getUser(req);
    if(!user){
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    let list = req.body.facts;
    await Prisma.funFact.createMany({
        data: list.map((fact : string) => ({
            content: fact,
            authorId: user.id,
        }))
    });
    res.status(200).json({message: "Success"});
}
