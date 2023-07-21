'use server'

import fs from 'fs'
import { SubmitCommitRequest } from '@/@types/submit-commit.dto'
import { prisma } from '@/lib/prisma'
import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { submitCommitService } from '@/service/submit-commit.service'
import chalk from 'chalk'

export async function submitCommitsAction({
  tags,
  description,
  imageUrls = [],
  commitIds,
}: SubmitCommitRequest) {
  if (tags.length === 0) {
    throw new Error('Add at least one tag.')
  }

  if (commitIds.length === 0) {
    throw new Error('No commitIds provided.')
  }

  console.info(chalk.gray('\ncreating commits submit in database...'))

  const { id: commitsSubmitId } = await prisma.commitsSubmit.create({
    data: {
      description,
      imageUrls,
      tags,
      commits: { connect: commitIds.map((id) => ({ id })) },
    },
  })

  console.info(chalk.green(`successfully created!`))
  console.info(chalk.gray('\nsubmitting feedback to slack...'))

  try {
    await submitCommitService.submitCommitToSlack(commitsSubmitId)
  } catch (err) {
    console.info(chalk.red(`failed to submit to slack...`), chalk.red(err))

    await prisma.commitsSubmit.delete({ where: { id: commitsSubmitId } })

    throw err
  }

  console.info(chalk.green(`successfully submitted!\n`))

  const commitsUpdated = await prisma.commit.findMany({
    include: { submitInfo: true },
  })

  return commitsUpdated as CommitWithSubmitInfo[]
}

/**
 * DEV DEBUG
 */
export async function unsubmitCommitsAction() {
  await prisma.commitsSubmit.deleteMany()

  const commitsUpdated = await prisma.commit.findMany({
    include: { submitInfo: true },
  })

  return commitsUpdated as CommitWithSubmitInfo[]
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
