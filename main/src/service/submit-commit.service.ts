import { prisma } from '@/lib/prisma'
import SlackService, { slackService } from './slack.service'
import { linkMessage } from '@/lib/utils'

export default class SubmitCommitService {
  constructor(private readonly slackService: SlackService) {}

  async submitCommitToSlack(commitsSubmitId: string) {
    const commitsSubmit = await prisma.commitsSubmit.findUnique({
      where: { id: commitsSubmitId },
      include: { commits: true },
    })

    if (!commitsSubmit) {
      throw new Error(`Submit ${commitsSubmitId} not found`)
    }

    const commits = commitsSubmit.commits

    const channel = await slackService.getChannel('daily-it')

    const messages = await slackService.getMessagesHistory(channel.id)

    if (messages.length === 0) {
      throw new Error('No messages found no #daily-it channel')
    }

    const lastMessage = messages[0]

    const links = commits.map((commit) =>
      linkMessage(commit.redirectUrl, commit.message),
    )

    const messageBlocks = [
      `*${commitsSubmit.tags.map((tag) => `#${tag}`).join(' ')}*`,
      commitsSubmit.description,
      links.join('\n'),
    ].filter((messageBlock) => !!messageBlock) as string[]

    try {
      await this.slackService.postThreadMessage(
        channel.id,
        lastMessage.ts,
        messageBlocks,
      )
    } catch (err) {
      if (links.length > 22) {
        throw Error(
          'Too many commits selected, slack API not support more than 22 links per message. Please split your commits in multiple submits (max 22 commits per submit) and try again.',
        )
      }

      throw err
    }
  }
}

const submitCommitService = new SubmitCommitService(slackService)

export { submitCommitService }
