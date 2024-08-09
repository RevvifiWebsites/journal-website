-- AlterTable
ALTER TABLE "FunFact" ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "country" TEXT;
