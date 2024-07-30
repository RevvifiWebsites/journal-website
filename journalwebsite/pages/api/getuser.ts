
import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let user;
    if(req.body.params?.id == undefined){
        user = await getUser(req);
    } else {
         user = await Prisma.user.findUnique({
            where: {
                id: req.body.params.id,
            },
        });
    }
    if(user){
        let sentObj = {
            id: user.id,
            username: user.name,
            email: user.email,
            admin: user.admin,
        }
        res.status(200).json(sentObj);
    }
}
