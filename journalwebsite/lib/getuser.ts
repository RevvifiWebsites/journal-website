import { NextApiRequest } from "next";
import Prisma from '@/lib/prisma';
import {verify  } from 'jsonwebtoken';

export default async function getUser(req: NextApiRequest){
    let token = req.cookies.token;
    if(token){
        let decoded = verify(token, process.env.JWT_SECRET as string) as any; //with enough any casts, anything is possible
        return Prisma.user.findFirst({
            where: {
                name: decoded.username,
            }
        });
    }
    else {
        return null;
    }
}