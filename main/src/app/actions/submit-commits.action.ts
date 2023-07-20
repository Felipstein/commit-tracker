"use server"

import { SubmitCommitRequest } from "@/@types/submit-commit.dto";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitCommitsAction({ description, commitIds }: SubmitCommitRequest) {
  await prisma.commitsSubmit.createMany({
    data: commitIds.map(commitId => ({ commitId, description })),
  });

  revalidatePath('/');
}

/**
 * DEV DEBUG
 */
export async function unsubmitCommitsAction() {
  await prisma.commitsSubmit.deleteMany();

  revalidatePath('/');
}