export type SlackGenericResponse<T = any> = T & {
  ok: boolean
  error?: string
  warning?: string
  response_metadata: object & {
    messages?: string[]
    warnings?: string[]
    next_cursor?: string
  }
}

export type ConversationsListResponse = SlackGenericResponse<{
  channels: Array<{
    id: string
    name: string
    is_channel: boolean
    is_group: boolean
    is_im: boolean
    is_mpim: boolean
    is_private: boolean
    created: number
    is_archived: boolean
    is_general: boolean
    unlinked: number
    name_normalized: string
    is_shared: boolean
    is_org_shared: boolean
    is_pending_ext_shared: boolean
    pending_shared: any[]
    context_team_id: string
    updated: number
    parent_conversation: string | null
    creator: string
    is_ext_shared: boolean
    shared_team_ids: string[]
    pending_connected_team_ids: string[]
    is_member: boolean
    topic: object[]
    purpose: object[]
    previous_names: any[]
    num_members: number
  }>
}>

export type MessageBlock = {
  type: 'section' | string
  text: {
    type: 'mrkdwn' | string
    text: string
  }
}

export type ConversationsHistoryResponse = SlackGenericResponse<{
  messages: Array<{
    client_msg_id?: string
    bot_id?: string
    app_id?: string
    bot_profile?: object[]
    type: 'message' | string
    text: string
    user: string
    ts: string
    blocks?: MessageBlock[]
    team?: string
    thread_ts?: string
    reply_count?: number
    reply_users_count?: number
    latest_reply?: string
    reply_users?: string[]
    is_locked?: boolean
    subscribed?: boolean
    last_read?: string
    reactions?: string[]
    subtype?: string
  }>
  has_more: boolean
  pin_count: number
  channel_actions_ts: string | null
  channel_actions_count: number
}>

export type PostMessageRequest = {
  channel: string
  thread_ts?: string
  blocks: MessageBlock[]
}

export type PostMessageResponse = SlackGenericResponse<{
  channel: string
  ts: string
  message: {
    bot_id: string
    type: 'message'
    text: string
    user: string
    ts: string
    app_id: string
    blocks: MessageBlock[]
    team: string
    bot_profile: {
      id: string
      app_id: string
      name: string
      icons: object[]
      deleted: boolean
      updated: number
      team_id: string
    }
    thread_ts: string
    parent_user_id: string
  }
}>

export type CustomEntityPostMessage = {
  username: string
  icon_url: string
}
