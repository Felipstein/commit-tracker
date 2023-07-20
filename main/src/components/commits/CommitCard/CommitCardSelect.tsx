import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

export interface CommitCardSelectProps {
  isSelectable: boolean
  isSelected: boolean
}

export function CommitCardSelect({
  isSelected,
  isSelectable,
}: CommitCardSelectProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={cn('transition-colors', {
        hidden: !isSelectable,
      })}
    >
      {isSelected && <Checkbox checked className="hidden group-hover:flex" />}

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
  )
}
