'use client'

import { Commit } from '@prisma/client'
import { SubmitCommitsForm } from './forms/SubmitCommitsForm'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { cn } from '@/lib/utils'

export interface SubmitCommitsProps {
  commits: Commit[]
}

export function SubmitCommits({ commits }: SubmitCommitsProps) {
  const submitStatus = useCommitsFilterStore((s) => s.submitStatus)

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

        <span className="text-xs opacity-40">
          {commits.length} unsubmitted commit{commits.length > 1 ? 's' : ''}
        </span>
      </header>

      <SubmitCommitsForm commits={commits} />
    </div>
  )
}
