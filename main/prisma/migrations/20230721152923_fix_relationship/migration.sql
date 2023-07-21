/*
  Warnings:

  - You are about to drop the column `commitId` on the `commits_submits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "commits_submits" DROP CONSTRAINT "commits_submits_commitId_fkey";

-- DropIndex
DROP INDEX "commits_submits_commitId_key";

-- AlterTable
ALTER TABLE "commits" ADD COLUMN     "submitId" TEXT;

-- AlterTable
ALTER TABLE "commits_submits" DROP COLUMN "commitId";

-- AddForeignKey
ALTER TABLE "commits" ADD CONSTRAINT "commits_submitId_fkey" FOREIGN KEY ("submitId") REFERENCES "commits_submits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
