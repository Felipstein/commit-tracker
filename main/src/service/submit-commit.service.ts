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

    const channel = await slackService.getChannel('daily-it')

    const messages = await slackService.getMessagesHistory(channel.id)

    if (messages.length === 0) {
      throw new Error('No messages found no #daily-it channel')
    }

    const lastMessage = messages[0]

    const links = [
      linkMessage('https://github.com/Felipstein', 'eita sÔ'),
      linkMessage('https://github.com/Felipstein', 'eita carambolinhas'),
    ]

    const messageBlocks = [
      '*#feat #v2 #frontend*',
      'alo galera de cowboy!',
      links.join('\n'),
    ]

    await slackService.postThreadMessage(
      channel.id,
      lastMessage.ts,
      messageBlocks,
    )
  }
}

const submitCommitService = new SubmitCommitService(slackService)

export { submitCommitService }
