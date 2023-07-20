'use client'

import { CommitCard } from './CommitCard'
import { CommitsEmpty } from './CommitsEmpty'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { useMemo } from 'react'
import { useCommitsStore } from '@/stores/CommitsStore'
import { CommitWithSubmitInfo } from '@/@types/commit.type'

export function CommitsList() {
  const commits = useCommitsStore((s) => s.commits)

  const submitStatus = useCommitsFilterStore((s) => s.submitStatus)
  const byUsername = useCommitsFilterStore((s) => s.byUsername)

  const commitsFiltered = useMemo(() => {
    const commitsFiltered = (
      byUsername
        ? commits.filter((commit) => commit.authorName === byUsername)
        : commits
    ) as CommitWithSubmitInfo[]

    return commitsFiltered.filter((commit) =>
      submitStatus === 'not-submitted'
        ? !commit.submitInfo
        : submitStatus === 'submitted'
        ? !!commit.submitInfo
        : true,
    )
  }, [commits, submitStatus, byUsername])

  return (
    <div className="flow-root w-96">
      <span className="text-xs opacity-40">
        {commitsFiltered.length}{' '}
        {submitStatus === 'not-submitted'
          ? `unsubmitted commit${commitsFiltered.length > 1 ? 's' : ''}`
          : submitStatus === 'submitted'
          ? `submitted commit${commitsFiltered.length > 1 ? 's' : ''}`
          : `commit${commitsFiltered.length > 1 ? 's' : ''}`}
      </span>

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
