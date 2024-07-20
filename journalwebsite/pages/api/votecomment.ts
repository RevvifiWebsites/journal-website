
import type { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";
import getUser from "@/lib/getuser";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let user = await getUser(req);
    if(!user){
        res.status(401).json({message: "Not logged in"});
        return;
    }
    let id = req.body.id as string;
    let vote = req.body.vote as number;
    console.log(typeof(vote));
    if(vote != 1 && vote != -1){
        res.status(400).json({message: "Invalid vote"});
        return;
    }
    let comment = await Prisma.comment.findUnique({
        where: {
            id: id,
        },
    });
    if(!comment){
        res.status(404).json({message: "Comment not found"});
        return;
    }
    if(comment.upvotes.indexOf(user.id) != -1 ){
        if(vote == 1) {
            res.status(400).json({message: "Already voted"});
            return;
        }
        else {
            await Prisma.comment.update({
                where: {
                    id: id,
                },
                data: {
                    upvotes: {
                        set: comment.upvotes.filter((x) => x != user.id),
                    },
                },
            });
        }
    }
    else if(comment.downvotes.indexOf(user.id) != -1 ){
        if(vote == -1) {
            res.status(400).json({message: "Already voted"});
            return;
        }
        else {
            await Prisma.comment.update({
                where: {
                    id: id,
                },
                data: {
                    upvotes: {
                        set: comment.upvotes.filter((x) => x != user.id),
                    },
                },
            });
        }
    }
    else if(vote == 1){
        await Prisma.comment.update({
            where: {
                id: id,
            },
            data: {
                upvotes: {
                    push: user.id,
                },
            },
        });
    } else {
        await Prisma.comment.update({
            where: {
                id: id,
            },
            data: {
                downvotes: {
                    push: user.id,
                },
            },
        });
    }
    res.status(200).json({message: "Vote recorded"});
}
