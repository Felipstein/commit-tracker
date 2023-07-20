/*
  Warnings:

  - You are about to drop the column `commitsSubmitId` on the `commits` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commitId]` on the table `commits_submits` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `commitId` to the `commits_submits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "commits" DROP CONSTRAINT "commits_commitsSubmitId_fkey";

-- AlterTable
ALTER TABLE "commits" DROP COLUMN "commitsSubmitId";

-- AlterTable
ALTER TABLE "commits_submits" ADD COLUMN     "commitId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "commits_submits_commitId_key" ON "commits_submits"("commitId");

-- AddForeignKey
ALTER TABLE "commits_submits" ADD CONSTRAINT "commits_submits_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "commits"("id") ON DELETE CASCADE ON UPDATE CASCADE;
