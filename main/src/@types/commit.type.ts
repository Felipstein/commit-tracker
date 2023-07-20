import { Commit } from '@prisma/client'

export type CommitWithSubmitInfo = Commit & { submitInfo: string | null }
