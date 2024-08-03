
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
    if(vote != 1 && vote != -1){
        console.log(vote);
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
    if(comment.upvotes.includes(user.id)){
        if(vote == 1){
            res.status(200).json({message: "Already upvoted", upvotes: comment.upvotes, downvotes: comment.downvotes } );
            return;
        }
        comment.upvotes = comment.upvotes.filter((x) => x != user.id);
        comment.downvotes.push(user.id);
    }
    else if( comment.downvotes.includes(user.id)){
        if(vote == -1){
            res.status(200).json({message: "Already downvoted", upvotes: comment.upvotes, downvotes: comment.downvotes});
            return;
        }
        comment.downvotes = comment.downvotes.filter((x) => x != user.id);
        comment.upvotes.push(user.id);
    }
    else if(vote == 1){
        comment.upvotes.push(user.id);
    }
    else{
        comment.downvotes.push(user.id);
    }
    comment = await Prisma.comment.update({
        where: {
            id: id,
        },
        data: {
            upvotes: comment.upvotes,
            downvotes: comment.downvotes,
        },
    });
    res.status(200).json({message: "Vote recorded", upvotes: comment.upvotes, downvotes: comment.downvotes});
}
