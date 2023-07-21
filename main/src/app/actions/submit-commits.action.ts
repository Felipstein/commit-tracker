'use server'

import fs from 'fs'
import { SubmitCommitRequest } from '@/@types/submit-commit.dto'
import { prisma } from '@/lib/prisma'
import { CommitWithSubmitInfo } from '@/@types/commit.type'

export async function submitCommitsAction({
  description,
  commitIds,
}: SubmitCommitRequest) {
  if (commitIds.length === 0) {
    throw new Error('No commitIds provided.')
  }

  await prisma.commitsSubmit.createMany({
    data: commitIds.map((commitId) => ({ commitId, description })),
  })

  return (await prisma.commit.findMany({
    include: { submitInfo: true },
  })) as CommitWithSubmitInfo[]
}

/**
 * DEV DEBUG
 */
export async function unsubmitCommitsAction() {
  await prisma.commitsSubmit.deleteMany()

  return (await prisma.commit.findMany({
    include: { submitInfo: true },
  })) as CommitWithSubmitInfo[]
}

/**
 * DEV DEBUG
 */
export async function exportCommitsToJson() {
  try {
    const commits = await prisma.commit.findMany({
      include: { submitInfo: true },
    })

    const json = JSON.stringify(commits, null, 2)

    if (!fs.existsSync('tmp')) {
      fs.mkdirSync('tmp')
    }

    fs.writeFileSync('tmp/commits.json', json, 'utf8')

    console.log('Commits exported to commits.json.')
  } catch (error) {
    console.error('Fail to export:', error)
  }
}
