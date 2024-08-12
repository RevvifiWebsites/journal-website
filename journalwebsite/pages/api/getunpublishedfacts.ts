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
  let start = req.query.start as string | undefined;
  let facts = await Prisma.funFact.findMany({
    where: {
        OR: [
            {
                published: false
            },
            {
                Article: {
                        published: false
                }
            }
        ]
    },
    skip: start ? parseInt(start) : 0,
    take: 10,
  });
  if (facts) {
    res.status(200).json(facts);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
}
