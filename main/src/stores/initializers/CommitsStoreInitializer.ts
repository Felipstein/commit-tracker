'use client'

import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { useCommitsStore } from '../CommitsStore'
import { useRef } from 'react'

export interface CommitsStoreInitializerProps {
  commits: CommitWithSubmitInfo[]
}

export function CommitsStoreInitializer({
  commits,
}: CommitsStoreInitializerProps) {
  const initialized = useRef(false)

  if (!initialized.current) {
    initialized.current = true
    useCommitsStore.setState({
      commits,
      commitIdsSelected: commits
        .filter((commit) => !commit.submitInfo)
        .map((commit) => commit.id),
    })
  }

  return null
}
