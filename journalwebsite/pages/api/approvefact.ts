
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import getUser from "@/lib/getuser";
export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    let user = await getUser(req);
    if(!user || !user.admin){
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    let id = req.body.id as string;
    let fact = await Prisma.funFact.findUnique({
        where: {
            id: id,
        }
    });
    if(fact){
        let updated = await Prisma.funFact.update({
            where: {
                id: id,
            },
            data: {
                published: true,
            }
        });
        res.status(200).json(updated);
    }
    else {
        res.status(404).json({ message: "Fact not found" });
    }
}
