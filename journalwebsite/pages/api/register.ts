
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";

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
        let user = await Prisma.user.create({
        data: {
            name: req.body.username,
            passwordHash: hash,
            country: req.body.country,
            salt: salt
        }
        });
        const token = sign({ username: req.body.username }, process.env.JWT_SECRET as string, {  });
        res.setHeader('Set-Cookie', [`token=${token}; HttpOnly; SameSite=Strict; Path=/`, `username=${user.name}; SameSite=Strict; Path=/`, `id=${user.id}; Path=/`]);
        res.status(200).json({ message: "User created" });
    }
}
