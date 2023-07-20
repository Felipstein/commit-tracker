/*
  Warnings:

  - You are about to drop the column `isSubmitted` on the `commits` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "commits" DROP COLUMN "isSubmitted",
ADD COLUMN     "commitsSubmitId" TEXT;

-- CreateTable
CREATE TABLE "commits_submits" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commits_submits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "commits" ADD CONSTRAINT "commits_commitsSubmitId_fkey" FOREIGN KEY ("commitsSubmitId") REFERENCES "commits_submits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
