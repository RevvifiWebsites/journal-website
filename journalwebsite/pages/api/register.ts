
import type { NextApiRequest, NextApiResponse } from "next";
import  Prisma from '@/lib/prisma';
import { sign } from "jsonwebtoken";
import { genSaltSync, hashSync } from "bcrypt-ts";

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
        try{let salt = genSaltSync(10);
        let hashinput = req.body.password + salt;
        let hash = await hashSync(hashinput, salt);
        let user = await Prisma.user.create({
        data: {
            name: req.body.username,
            passwordHash: hash,
            country: req.body.country,
            email: req.body.email,
            salt: salt
        }
        });
        const token = sign({ username: req.body.username }, process.env.JWT_SECRET as string, {  });
        res.setHeader('Set-Cookie', [`token=${token}; HttpOnly; SameSite=Strict; Path=/`, `username=${user.name}; SameSite=Strict; Path=/`, `id=${user.id}; Path=/`]);
        res.status(200).json({ message: "User created" });
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Internal server error" });
    }
  }
}
