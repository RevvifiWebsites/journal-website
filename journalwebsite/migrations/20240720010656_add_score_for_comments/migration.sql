-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_VotedComments" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_VotedComments_AB_unique" ON "_VotedComments"("A", "B");

-- CreateIndex
CREATE INDEX "_VotedComments_B_index" ON "_VotedComments"("B");

-- AddForeignKey
ALTER TABLE "_VotedComments" ADD CONSTRAINT "_VotedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VotedComments" ADD CONSTRAINT "_VotedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
