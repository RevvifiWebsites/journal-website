import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(typeof req.body);
  let start = req.body.start as string | undefined;
  let search = req.body.search as string | undefined;
  console.log(req.body);
  let acount = await getUser(req);
  if (acount && acount.admin) {
    let article = await Prisma.article.findMany({
      skip: start ? parseInt(start) : 0,
      take: req.body.take ? parseInt(req.body.take as string) : 10,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            credit: {
              contains: search,
            },
          },
        ],
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
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          credit: {
            contains: search,
            mode: "insensitive",
          },
        }
      ]
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
