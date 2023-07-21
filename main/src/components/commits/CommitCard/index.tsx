import { Commit } from '@prisma/client'
import { Clock4 } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import { CommitCardSelect } from './CommitCardSelect'
import { GithubAvatar } from '@/components/GithugAvatar'

export interface CommitCardProps {
  commit: Commit
  isLast: boolean
  isSelected: boolean
  isSelectable: boolean
  onClick: () => void
}

export function CommitCard({
  commit,
  isLast,
  isSelectable,
  isSelected,
  onClick,
}: CommitCardProps) {
  return (
    <div className="relative pb-8">
      {!isLast && (
        <span
          className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-zinc-200 dark:bg-zinc-800"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative flex items-center space-x-2">
        {/* Left Circle */}
        <div>
          <div className="relative px-1 transition-transform hover:scale-110">
            <Link
              href={`https://github.com/${commit.authorName}`}
              target="_blank"
            >
              <GithubAvatar clientSide username={commit.authorName} />
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <button
          type="button"
          onClick={isSelectable ? () => onClick() : undefined}
          className={cn(
            'group flex w-full items-center justify-between gap-6 truncate rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900/20',
            {
              'bg-red-400/10 hover:bg-red-600/10 dark:bg-red-600/10 dark:hover:bg-red-800/10':
                !isSelected && isSelectable,
            },
          )}
        >
          <div className="flex flex-col items-start gap-1 truncate">
            <span className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
              {commit.message}
            </span>

            <footer className="flex items-end gap-2.5">
              <span className="text-xs text-zinc-400 dark:text-zinc-600">
                committed by{' '}
                <strong className="font-medium text-zinc-700 dark:text-zinc-300">
                  {commit.authorName}
                </strong>
              </span>

              <time className="flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-600">
                <Clock4 className="h-3 w-3" />
                {moment(commit.committedAt).fromNow()}
              </time>
            </footer>
          </div>

          <CommitCardSelect
            isSelectable={isSelectable}
            isSelected={isSelected}
          />
        </button>
      </div>
    </div>
  )
}
