"use client"

import { GithubAvatar } from "@/components/GithugAvatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface CollaboratorAvatarProps {
  username: string,
  onSelect: () => void,
  onCancelSelection: () => void,
  className?: string,
  isSelected: boolean,
  isNotSelected: boolean,
}

export function CollaboratorAvatar({ username, onSelect, onCancelSelection, className, isSelected, isNotSelected }: CollaboratorAvatarProps) {

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <button
            type="button"
            onClick={() => isSelected ? onCancelSelection() : onSelect()}
          >
            <GithubAvatar
              clientSide
              username={username}
              width={64}
              height={64}
              className={cn(
                "w-14 h-14 p-1.5 bg-zinc-50 dark:bg-zinc-950 transition-all group-hover:saturate-50 group-hover:scale-110 hover:!saturate-100 hover:!scale-125",
                {
                  "!scale-125 !saturate-100": isSelected,
                  "saturate-[0.25]": isNotSelected,
                },
                className,
              )}
            />
          </button>
        </TooltipTrigger>

        <TooltipContent>
          <span className="text-zinc-300">
            {!isSelected && (
              <>
                Filter by <strong className="text-zinc-50">{username}</strong>
              </>
            )}

            {isSelected && (
              <>
                Cancel filter of <strong className="text-zinc-50">{username}</strong>
              </>
            )}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}