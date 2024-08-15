import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user;
  if (req.query?.id == undefined) {
    user = await getUser(req);
  } else {
    user = await Prisma.user.findUnique({
      where: {
        id: req.query.id as string,
      },
    });
    console.log(user?.id);
    if (user) {
      let posts = await Prisma.article.findMany({
        where: {
          authorId: user.id,
          published: true,
        },
      });
      let facts = await Prisma.funFact.findMany({
        where: {
          authorId: user.id,
          OR: [
            {
              published: true,
            },
            {
              Article: {
                published: true,
              },
            },
          ],
        },
      });
      let comments = await Prisma.comment.findMany({
        where: {
          authorId: user.id,
        },
      });
        (user as any).comments = comments;
      (user as any).posts = posts;
      (user as any).facts = facts;
    }
  }
  if (user) {
    let sentObj = user as any;
    sentObj.username = user.name;
    delete sentObj.name;
    delete sentObj.salt;
    delete sentObj.passwordHash;
    delete sentObj.email;
    res.status(200).json(sentObj);
  }
}
