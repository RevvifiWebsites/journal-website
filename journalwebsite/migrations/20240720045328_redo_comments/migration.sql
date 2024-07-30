/*
  Warnings:

  - You are about to drop the `_downvotedcomments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_upvotedcomments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_downvotedcomments" DROP CONSTRAINT "_downvotedcomments_A_fkey";

-- DropForeignKey
ALTER TABLE "_downvotedcomments" DROP CONSTRAINT "_downvotedcomments_B_fkey";

-- DropForeignKey
ALTER TABLE "_upvotedcomments" DROP CONSTRAINT "_upvotedcomments_A_fkey";

-- DropForeignKey
ALTER TABLE "_upvotedcomments" DROP CONSTRAINT "_upvotedcomments_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "downvotes" TEXT[],
ADD COLUMN     "upvotes" TEXT[];

-- DropTable
DROP TABLE "_downvotedcomments";

-- DropTable
DROP TABLE "_upvotedcomments";
