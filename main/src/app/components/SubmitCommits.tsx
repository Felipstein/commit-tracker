'use client'

import { SubmitCommitsForm } from './forms/SubmitCommitsForm'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { cn } from '@/lib/utils'
import { useCommitsStore } from '@/stores/CommitsStore'
import { useMemo, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function SubmitCommits() {
  const [mounted, setMounted] = useState(false)

  const submitStatus = useCommitsFilterStore((s) => s.submitStatus)
  const byUsername = useCommitsFilterStore((s) => s.byUsername)

  const commits = useCommitsStore((s) => s.commits)
  const commitIdsSelected = useCommitsStore((s) => s.commitIdsSelected)

  const unsubmittedCommitsOfUser = useMemo(
    () =>
      commits.filter(
        (commit) =>
          !commit.submitInfo &&
          commit.authorName.toLowerCase() === byUsername?.toLowerCase(),
      ),
    [commits, byUsername],
  )

  const unsubmittedCommitsSelected = useMemo(
    () =>
      unsubmittedCommitsOfUser.filter((commit) =>
        commitIdsSelected.includes(commit.id),
      ),
    [unsubmittedCommitsOfUser, commitIdsSelected],
  )

  useMemo(() => {
    setMounted(true)
  }, [])

  const children = useMemo(
    () => (
      <div
        className={cn('space-y-6', {
          'pointer-events-none select-none opacity-30 dark:opacity-20':
            submitStatus !== 'not-submitted' || !byUsername,
        })}
      >
        <header>
          <h1 className="whitespace-nowrap text-start text-2xl font-semibold text-zinc-500 dark:text-zinc-300">
            Submit Commits
          </h1>

          <div className="flex items-center gap-1.5">
            <span className="text-xs opacity-40">
              {unsubmittedCommitsSelected.length} unsubmitted commit
              {unsubmittedCommitsSelected.length > 1 ? 's' : ''}
            </span>

            {unsubmittedCommitsOfUser.length !==
              unsubmittedCommitsSelected.length && (
              <span className="text-[10px] opacity-30 dark:opacity-20">
                {`of ${unsubmittedCommitsOfUser.length} unsubmitted commits in total`}
              </span>
            )}
          </div>
        </header>

        <SubmitCommitsForm
          unsubmittedCommitsSelected={unsubmittedCommitsSelected}
        />
      </div>
    ),
    [
      byUsername,
      unsubmittedCommitsOfUser.length,
      unsubmittedCommitsSelected,
      submitStatus,
    ],
  )

  if (!mounted || byUsername) {
    return children
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-default">{children}</TooltipTrigger>
        <TooltipContent>
          You should only submit commits from one person (preferably you)
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
