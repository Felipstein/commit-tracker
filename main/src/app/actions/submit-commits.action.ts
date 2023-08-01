'use server'

import fs from 'fs'
import { SubmitCommitRequest } from '@/@types/submit-commit.dto'
import { prisma } from '@/lib/prisma'
import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { submitCommitService } from '@/service/submit-commit.service'
import chalk from 'chalk'
import { CommitData } from '../api/commits/route'
import axios from 'axios'
import { randomUUID } from 'crypto'

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
export async function generateCommits(total = 5) {
  const authors = [
    { name: 'Felipstein', email: 'felipstein@gmail.com' },
    { name: 'Yanzaum', email: 'yandavid80@gmail.com' },
    { name: 'lucafrederice', email: 'lucafrederice@gmail.com' },
    { name: 'Metrito', email: 'oficial@metrito.com' },
  ]

  const fakeCommits: CommitData[] = Array.from({ length: total }).map(() => {
    const randomAuthorIndex = Math.floor(Math.random() * authors.length)
    const randomAuthor = authors[randomAuthorIndex]

    const authorName = randomAuthor.name
    const authorEmail = randomAuthor.email

    return {
      commitHash: randomUUID(),
      commitMessage: 'chore: this is a fake commit',
      authorName,
      authorEmail,
      date: new Date().toDateString(),
      redirectUrl: `https://github.com/${authorName}`,
    }
  })

  const promises = fakeCommits.map((commit) =>
    axios.post('http://localhost:3000/api/commits', commit),
  )

  console.info(chalk.gray(`creating ${total} fake commits...`))

  await Promise.all(promises)

  console.info(chalk.green(`successfully ${total} fake commits create.`))

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
