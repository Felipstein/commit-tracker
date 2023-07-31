'use client'

import { CommitCard } from './CommitCard'
import { CommitsEmpty } from './CommitsEmpty'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { useMemo, useState } from 'react'
import { useCommitsStore } from '@/stores/CommitsStore'
import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'

export function CommitsList() {
  const {
    commits,
    commitIdsSelected: allCommitIdsSelected,
    toggleSelectCommitId,
    toggleSelectAllCommitIds,
  } = useCommitsStore()

  const submitStatus = useCommitsFilterStore((s) => s.submitStatus)
  const byUsername = useCommitsFilterStore((s) => s.byUsername)

  const [showList, setShowList] = useState(true)

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

  const commitIdsSelected = useMemo(
    () =>
      allCommitIdsSelected.filter((commitId) => {
        const commit = commits.find((commit) => commit.id === commitId)!

        return commit.authorName === byUsername
      }),
    [allCommitIdsSelected, byUsername, commits],
  )

  return (
    <div className="flow-root h-full w-80">
      {commitsFiltered.length > 0 && (
        <header className="flex w-full items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowList((prevState) => !prevState)}
            className="flex items-center gap-1 opacity-40 transition hover:opacity-60"
          >
            <span className="text-xs">
              {commitsFiltered.length}{' '}
              {submitStatus === 'not-submitted'
                ? `unsubmitted commit${commitsFiltered.length > 1 ? 's' : ''}`
                : submitStatus === 'submitted'
                ? `submitted commit${commitsFiltered.length > 1 ? 's' : ''}`
                : `commit${commitsFiltered.length > 1 ? 's' : ''}`}
            </span>

            <ChevronDownIcon
              className={cn('h-3 w-3', {
                'rotate-180': showList,
              })}
            />
          </button>

          {submitStatus === 'not-submitted' && byUsername && (
            <div
              className={cn('mb-2 flex items-center gap-1', {
                'pointer-events-none invisible': !showList,
              })}
            >
              <Checkbox
                id="select-all"
                checked={commitIdsSelected.length === commitsFiltered.length}
                onClick={toggleSelectAllCommitIds}
                className="flex h-[12px] w-[12px]"
                classNameForIcon="w-3 h-3"
              />

              <Label
                htmlFor="select-all"
                className="mt-[2px] text-xs opacity-60"
              >
                Select all
              </Label>
            </div>
          )}
        </header>
      )}

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
        <ul
          className={cn({
            hidden: !showList,
          })}
        >
          <ScrollArea className="-mb-8 h-full w-full truncate pr-2">
            {commitsFiltered.map((commit, index) => (
              <li key={commit.id} className="block">
                <CommitCard
                  commit={commit}
                  isLast={index === commitsFiltered.length - 1}
                  isSelectable={Boolean(
                    submitStatus === 'not-submitted' && byUsername,
                  )}
                  isSelected={commitIdsSelected.includes(commit.id)}
                  onClick={() => toggleSelectCommitId(commit.id)}
                />
              </li>
            ))}
          </ScrollArea>
        </ul>
      )}
    </div>
  )
}
