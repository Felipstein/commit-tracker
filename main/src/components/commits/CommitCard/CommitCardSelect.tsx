import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
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
      {isSelected && (
        <Checkbox asChild checked className="hidden group-hover:flex">
          <div />
        </Checkbox>
      )}

      {!isSelected && (
        <div className="h-4 w-4 rounded border border-red-600/30 !bg-transparent !text-red-600 dark:border-red-400/30 dark:!text-red-400" />
      )}
    </div>
  )
}
