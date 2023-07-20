'use client'

import { GithubAvatar } from '@/components/GithugAvatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export interface CollaboratorAvatarProps {
  username: string
  onSelect: () => void
  onCancelSelection: () => void
  className?: string
  isSelected: boolean
  isNotSelected: boolean
  interactionDisabled?: boolean
}

export function CollaboratorAvatar({
  username,
  onSelect,
  onCancelSelection,
  className,
  isSelected,
  isNotSelected,
  interactionDisabled = false,
}: CollaboratorAvatarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => (isSelected ? onCancelSelection() : onSelect())}
            className={cn({
              'pointer-events-none': interactionDisabled,
            })}
          >
            <GithubAvatar
              clientSide
              username={username}
              width={64}
              height={64}
              className={cn(
                'h-12 w-12 bg-zinc-50 p-0.5 transition-all hover:!scale-125 hover:!saturate-100 dark:bg-zinc-950',
                {
                  '!scale-125 !saturate-100':
                    isSelected && !interactionDisabled,
                  'saturate-[0.25]': isNotSelected,
                  'group-hover/avatar:scale-110 group-hover/avatar:saturate-50':
                    !interactionDisabled,
                },
                className,
              )}
              classNameForImage={cn('border-2 border-transparent', {
                'border-zinc-800 dark:border-zinc-200': isSelected,
              })}
            />
          </button>
        </TooltipTrigger>

        <TooltipContent asChild>
          <span className="text-zinc-500 dark:text-zinc-300">
            {!isSelected && (
              <>
                Filter by{' '}
                <strong className="text-zinc-600 dark:text-zinc-50">
                  {username}
                </strong>
              </>
            )}

            {isSelected && (
              <>
                Cancel filter of{' '}
                <strong className="text-zinc-600 dark:text-zinc-50">
                  {username}
                </strong>
              </>
            )}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
