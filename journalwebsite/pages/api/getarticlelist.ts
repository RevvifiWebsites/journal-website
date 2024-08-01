import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(typeof req.body);
  let start = req.body.start as string | undefined;
  let acount = await getUser(req);
  if(acount && acount.admin){
    console.log("start" + start);
    let article = await Prisma.article.findMany({
      skip: start ? parseInt(start) : 0,
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  }
  let article = await Prisma.article.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: start ? parseInt(start) : 0,
    take: 10,
  });
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
}
