export interface SubmitCommitRequest {
  description?: string | null
  imageUrls?: string[]
  commitIds: string[]
}
