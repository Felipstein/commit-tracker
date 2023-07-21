import axios, { AxiosInstance } from 'axios'
import {
  ConversationsHistoryResponse,
  ConversationsListResponse,
  MessageBlock,
  PostMessageRequest,
  PostMessageResponse,
  SlackGenericResponse,
} from './slack.dto'

const oauthUserToken = process.env.SLACK_OAUTH_USER_TOKEN

if (!oauthUserToken) {
  throw new Error('OAUTH_USER_TOKEN is not defined in .env file')
}

export default class SlackService {
  constructor(private readonly api: AxiosInstance) {}

  async getConversationsList() {
    const { data } = await this.api.get<ConversationsListResponse>(
      '/conversations.list',
    )

    const channels = data.channels

    if (!channels || channels.length === 0) {
      throw new Error('No channels found.')
    }

    return channels
  }

  async getChannel(channelName: string) {
    const channels = await this.getConversationsList()

    const channel = channels.find((channel) => channel.name === channelName)

    if (!channel) {
      throw new Error(`Channel #${channelName} not found.`)
    }

    return channel
  }

  async getMessagesHistory(channelId: string) {
    const { data } = await this.api.get<ConversationsHistoryResponse>(
      '/conversations.history',
      {
        params: { channel: channelId },
      },
    )

    const messages = data.messages

    if (!messages || messages.length === 0) {
      throw new Error('No messages found.')
    }

    return messages
  }

  async postThreadMessage(
    channelId: string,
    threadTs: string,
    messageBlocks: string[],
  ) {
    const blocks = messageBlocks.map((messageBlock) => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: messageBlock,
      },
    })) as MessageBlock[]

    const messagePayload: PostMessageRequest = {
      channel: channelId,
      thread_ts: threadTs,
      blocks,
    }

    const { data } = await this.api.post<PostMessageResponse>(
      '/chat.postMessage',
      messagePayload,
    )

    return data
  }
}

const slackApi = axios.create({
  baseURL: 'https://slack.com/api/',
  headers: {
    Authorization: `Bearer ${oauthUserToken}`,
  },
})

slackApi.interceptors.response.use((response) => {
  const data = response.data as SlackGenericResponse<unknown>

  if (!data.ok) {
    const firstMessage =
      data.response_metadata!.messages?.[0] || 'Unknown error'

    throw new Error(`${data.error}: ${firstMessage}`)
  }

  return response
})

const slackService = new SlackService(slackApi)

export { slackService, slackApi }
