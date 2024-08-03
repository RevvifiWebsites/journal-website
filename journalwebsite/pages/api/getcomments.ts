import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let start = req.query.start as string | undefined;
  let id = req.query.id as string;
  let amount = req.query.amount as string | undefined;
  let comment = await Prisma.comment.findMany({
    where: {
        articleId : id
    },
    skip: start ? parseInt(start) : 0,
    take: amount ? parseInt(amount) : 500,
  });

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
}
