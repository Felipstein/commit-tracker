/*
  Warnings:

  - Added the required column `redirectUrl` to the `commits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commits" ADD COLUMN     "redirectUrl" TEXT NOT NULL;
