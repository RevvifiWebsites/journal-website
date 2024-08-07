-- CreateTable
CREATE TABLE "FunFact" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "articleId" TEXT,

    CONSTRAINT "FunFact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FunFact" ADD CONSTRAINT "FunFact_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FunFact" ADD CONSTRAINT "FunFact_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE SET NULL ON UPDATE CASCADE;
