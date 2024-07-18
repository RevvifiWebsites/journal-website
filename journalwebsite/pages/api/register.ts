
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import * as argon2 from "argon2";

export  default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let user = await Prisma.user.findFirst({
    where: {
      name: req.body.username,
    }
  });
  if(user){
    res.status(200).json({ message: "User with that name already exists, try a new username" });
  }
    else {
        let salt = require('crypto').randomBytes(32).toString('hex');
        let hashinput = req.body.password + salt;
        let hash = await argon2.hash(hashinput);
        await Prisma.user.create({
        data: {
            name: req.body.username,
            passwordHash: hash,
            salt: salt
        }
        });
        res.status(200).json({ message: "User created" });
    }
}
