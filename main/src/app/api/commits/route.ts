import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const commitDataSchema = z.object({
  commitHash: z.string().nonempty('commitHash is required.'),
  commitMessage: z.string().nonempty('commitMessage is required.'),
  authorName: z.string().nonempty('authorName is required.'),
  authorEmail: z.string().nonempty('authorEmail is required.'),
  date: z.string().nonempty('date is required.'),
  redirectUrl: z.string().nonempty('redirectUrl is required.'),
})

export async function POST(req: NextRequest) {
  const json = await req.json()

  const {
    commitHash,
    commitMessage,
    authorName,
    authorEmail,
    date: committedAt,
    redirectUrl,
  } = commitDataSchema.parse(json)

  const hashAlreadyExists = await prisma.commit.findUnique({
    where: { hash: commitHash },
    select: { id: true },
  })
  if (hashAlreadyExists) {
    return NextResponse.json(
      { message: 'Hash already exists.' },
      { status: 409 },
    )
  }

  const redirectUrlRegex = /^git@github\.com:(.+)\/(.+)\/commit\/(.+)/
  const urlMatched = redirectUrl.match(redirectUrlRegex)

  let authorNameFixed
  let redirecUrlFixed

  if (urlMatched) {
    authorNameFixed = urlMatched[1]
    const repository = urlMatched[2]
    const commitHash = urlMatched[3]

    redirecUrlFixed = `https://github.com/Metrito/${repository}/commit/${commitHash}`
  } else {
    authorNameFixed = authorName
    redirecUrlFixed = redirectUrl
  }

  let committedAtFixed
  const fixTimeZoneDays = process.env.FIX_TIME_ZONE_DAYS as unknown as number

  if (
    typeof fixTimeZoneDays === 'number' ||
    typeof fixTimeZoneDays === 'string'
  ) {
    const committedAtInMS = new Date(committedAt).getTime()
    const fixTimeZoneMs =
      (typeof fixTimeZoneDays === 'string'
        ? Number(fixTimeZoneDays)
        : fixTimeZoneDays) *
      24 *
      60 *
      60 *
      1000

    committedAtFixed = new Date(committedAtInMS + fixTimeZoneMs)
  } else {
    committedAtFixed = new Date(committedAt)
  }

  const commitData = await prisma.commit.create({
    data: {
      hash: commitHash,
      message: commitMessage,
      authorName: authorNameFixed,
      authorEmail,
      committedAt: committedAtFixed,
      redirectUrl: redirecUrlFixed,
    },
  })

  return NextResponse.json(commitData, { status: 201 })
}
