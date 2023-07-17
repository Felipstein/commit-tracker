/*
  Warnings:

  - Added the required column `authorEmail` to the `commits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorName` to the `commits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commits" ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "authorName" TEXT NOT NULL,
ADD COLUMN     "committedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isSubmitted" BOOLEAN NOT NULL DEFAULT false;
