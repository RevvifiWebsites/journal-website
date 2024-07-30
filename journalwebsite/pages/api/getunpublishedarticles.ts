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
  let article = await Prisma.article.findMany({
    where: {
      published: false,
    },
    skip: start ? parseInt(start) : 0,
    take: 10,
  });
  console.log(article);
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
}
