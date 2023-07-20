import { Commit } from '@prisma/client'
import { Clock4, X } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { GithubAvatar } from '../GithugAvatar'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

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
            'group w-full flex-1 flex items-center justify-between gap-6 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900/20',
            {
              'bg-red-400/10 dark:bg-red-600/10 hover:bg-red-600/10 dark:hover:bg-red-800/10':
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

          <div
            className={cn('transition-colors', {
              hidden: !isSelectable,
            })}
          >
            {isSelected && (
              <Checkbox checked className="hidden group-hover:flex" />
            )}

            {!isSelected && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Checkbox
                      checked
                      className="flex items-center justify-center !bg-transparent !text-red-600 dark:!text-red-400 border-red-600/30 dark:border-red-400/30"
                      icon={X}
                    />
                  </TooltipTrigger>

                  <TooltipContent asChild>
                    <span>Commit not selected to submit</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
