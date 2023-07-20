'use client'

import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { useCommitsStore } from '../CommitsStore'

export interface CommitsStoreInitializerProps {
  commits: CommitWithSubmitInfo[]
}

export function CommitsStoreInitializer({
  commits,
}: CommitsStoreInitializerProps) {
  useCommitsStore.setState({
    commits,
    commitIdsSelected: commits
      .filter((commit) => !commit.submitInfo)
      .map((commit) => commit.id),
  })

  return null
}
