"use server"

import { SubmitCommitRequest } from "@/@types/submit-commit.dto";

export async function submitCommitsAction({ description }: SubmitCommitRequest) {
  console.log('executed on server');

  throw new Error('oh nous');
}