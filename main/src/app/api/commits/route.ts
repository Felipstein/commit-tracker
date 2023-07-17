import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commitDataSchema = z.object({
  commitHash: z.string().nonempty('commitHash is required.'),
  commitMessage: z.string().nonempty('commitMessage is required.'),
  authorName: z.string().nonempty('authorName is required.'),
  authorEmail: z.string().nonempty('authorEmail is required.'),
  date: z.string().nonempty('date is required.'),
  redirectUrl: z.string().nonempty('redirectUrl is required.'),
});

export async function POST(req: NextRequest) {
  const json = await req.json();

  const {
    commitHash, commitMessage, authorName, authorEmail, date: committedAt, redirectUrl
  } = commitDataSchema.parse(json);

  const hashAlreadyExists = await prisma.commit.findUnique({
    where: { hash: commitHash },
    select: { id: true },
  });
  if(hashAlreadyExists) {
    return NextResponse.json({ message: 'Hash already exists.' }, { status: 409 });
  }

  const commitData = await prisma.commit.create({
    data: {
      hash: commitHash,
      message: commitMessage,
      authorName,
      authorEmail,
      committedAt,
      redirectUrl,
    },
  });

  return NextResponse.json(commitData, { status: 201 });
}