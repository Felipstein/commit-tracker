'use client'

import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { useRef } from 'react'
import { useCommitsStore } from '../CommitsStore'

export interface CommitsStoreInitializerProps {
  commits: CommitWithSubmitInfo[]
}

export function CommitsStoreInitializer({
  commits,
}: CommitsStoreInitializerProps) {
  const mounted = useRef(false)

  if (!mounted.current) {
    useCommitsStore.setState({
      commits,
      commitIdsSelected: commits
        .filter((commit) => !commit.submitInfo)
        .map((commit) => commit.id),
    })
    mounted.current = true
  }

  return null
}
