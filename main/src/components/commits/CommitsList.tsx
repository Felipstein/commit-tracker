'use client'

import { Commit } from '@prisma/client'
import { CommitCard } from './CommitCard'
import { CommitsEmpty } from './CommitsEmpty'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { useMemo } from 'react'

export interface CommitsListProps {
  commits: Commit[]
}

export function CommitsList({ commits }: CommitsListProps) {
  const byUsername = useCommitsFilterStore((s) => s.byUsername)

  const commitsFiltered = useMemo(
    () =>
      byUsername
        ? commits.filter((commit) => commit.authorName === byUsername)
        : commits,
    [commits, byUsername],
  )

  return (
    <div className="flow-root w-96">
      {commits.length === 0 && <CommitsEmpty />}

      {commits.length > 0 && commitsFiltered.length === 0 && (
        <CommitsEmpty.Root>
          <CommitsEmpty.Label>
            No commits recoreded by{' '}
            <strong className="font-semibold text-zinc-500 dark:text-zinc-300">
              {byUsername}
            </strong>{' '}
            yet
          </CommitsEmpty.Label>
        </CommitsEmpty.Root>
      )}

      {commitsFiltered.length > 0 && (
        <ul role="list" className="-mb-8 w-full">
          {commitsFiltered.map((commit, index) => (
            <li key={commit.id}>
              <CommitCard
                commit={commit}
                isLast={index === commitsFiltered.length - 1}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
