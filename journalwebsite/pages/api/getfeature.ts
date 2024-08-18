import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let start = req.body.start as string | undefined;
  let article = await Prisma.article.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: start ? parseInt(start) : 0,
    take: parseInt(req.body.take) || 10,
  });
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
}
