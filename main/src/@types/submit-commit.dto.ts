export interface SubmitCommitRequest {
  tags: string[]
  description?: string | null
  imageUrls?: string[]
  commitIds: string[]
}
