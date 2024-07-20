/*
  Warnings:

  - You are about to drop the `_VotedComments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_VotedComments" DROP CONSTRAINT "_VotedComments_A_fkey";

-- DropForeignKey
ALTER TABLE "_VotedComments" DROP CONSTRAINT "_VotedComments_B_fkey";

-- DropTable
DROP TABLE "_VotedComments";

-- CreateTable
CREATE TABLE "_upvotedcomments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_downvotedcomments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedcomments_AB_unique" ON "_upvotedcomments"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedcomments_B_index" ON "_upvotedcomments"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downvotedcomments_AB_unique" ON "_downvotedcomments"("A", "B");

-- CreateIndex
CREATE INDEX "_downvotedcomments_B_index" ON "_downvotedcomments"("B");

-- AddForeignKey
ALTER TABLE "_upvotedcomments" ADD CONSTRAINT "_upvotedcomments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedcomments" ADD CONSTRAINT "_upvotedcomments_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotedcomments" ADD CONSTRAINT "_downvotedcomments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotedcomments" ADD CONSTRAINT "_downvotedcomments_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
