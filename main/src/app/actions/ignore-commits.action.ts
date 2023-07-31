'use server'

import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { prisma } from '@/lib/prisma'
import chalk from 'chalk'

export async function ignoreCommitsAction(commitIds: string[]) {
  if (commitIds.length === 0) {
    throw new Error('No commitIds provided.')
  }

  console.info(chalk.gray('deleting commits in database...'))

  const { count } = await prisma.commit.deleteMany({
    where: { id: { in: commitIds } },
  })

  console.info(chalk.green(`successfully deleted ${count} commits.`))

  const commitsUpdated = await prisma.commit.findMany({
    include: { submitInfo: true },
  })

  return commitsUpdated as CommitWithSubmitInfo[]
}
