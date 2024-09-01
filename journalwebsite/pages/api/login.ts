
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';

import { sign } from 'jsonwebtoken';
import { compareSync } from "bcrypt-ts";
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
    if (user.passwordHash &&  compareSync( req.body.password + user.salt, user.passwordHash)) {
      const token = sign({ username: user.name }, process.env.JWT_SECRET as string, {  });
      res.setHeader('Set-Cookie', [`token=${token}; Secure; HttpOnly; SameSite=Strict; Path=/`, `username=${user.name}; SameSite=Strict; Path=/`, `id=${user.id}; Path=/`]); //IOS browsers will not send secure cookies across http even if its only sent locally for some reason. For the sake of testing on IOS ive removed it. 
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
