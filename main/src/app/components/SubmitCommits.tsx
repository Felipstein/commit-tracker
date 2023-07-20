'use client'

import { SubmitCommitsForm } from './forms/SubmitCommitsForm'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { cn } from '@/lib/utils'
import { useCommitsStore } from '@/stores/CommitsStore'
import { useMemo } from 'react'

export function SubmitCommits() {
  const submitStatus = useCommitsFilterStore((s) => s.submitStatus)

  const commits = useCommitsStore((s) => s.commits)
  const commitIdsSelected = useCommitsStore((s) => s.commitIdsSelected)

  const unsubmittedCommits = useMemo(
    () => commits.filter((commit) => !commit.submitInfo),
    [commits],
  )

  const unsubmittedCommitsSelected = useMemo(
    () =>
      unsubmittedCommits.filter((commit) =>
        commitIdsSelected.includes(commit.id),
      ),
    [unsubmittedCommits, commitIdsSelected],
  )

  return (
    <div
      className={cn('space-y-6', {
        'opacity-30 dark:opacity-20 pointer-events-none select-none':
          submitStatus !== 'not-submitted',
      })}
    >
      <header>
        <h1 className="whitespace-nowrap text-2xl font-semibold text-zinc-500 dark:text-zinc-300">
          Submit Commits
        </h1>

        <div className="flex items-center gap-1.5">
          <span className="text-xs opacity-40">
            {unsubmittedCommitsSelected.length} unsubmitted commit
            {unsubmittedCommitsSelected.length > 1 ? 's' : ''}
          </span>

          {unsubmittedCommits.length !== unsubmittedCommitsSelected.length && (
            <span className="text-[10px] opacity-30 dark:opacity-20">
              {`of ${unsubmittedCommits.length} unsubmitted commits in total`}
            </span>
          )}
        </div>
      </header>

      <SubmitCommitsForm
        unsubmittedCommitsSelected={unsubmittedCommitsSelected}
      />
    </div>
  )
}
