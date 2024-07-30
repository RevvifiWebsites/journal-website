
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import * as argon2 from "argon2";
import { sign } from 'jsonwebtoken';
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
    let hashinput = req.body.password + user.salt;
    if (user.passwordHash && await argon2.verify(user.passwordHash, hashinput)) {
      const token = sign({ username: user.name }, process.env.JWT_SECRET as string, {  });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; SameSite=Strict; Path=/`); //IOS browsers will not send secure cookies across http. For the sake of testing on IOS ive removed it. TODO: readd secure later
      res.status(200).json({ message: "Logged in" });
    }
    else {
      res.status(401).json({ message: "Incorrect password" });
    }
  }
  else {
    res.status(404).json({ message: "No user with that username" });
  }
}
