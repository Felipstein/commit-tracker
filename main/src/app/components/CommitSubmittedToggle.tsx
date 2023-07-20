'use client'

import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export function CommitSubmittedToggle() {
  const [showFilters, setShowFilters] = useState(false)

  const submitStatus = useCommitsFilterStore((s) => s.submitStatus)
  const changeSubmitStatus = useCommitsFilterStore((s) => s.changeSubmitStatus)

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className="text-xs opacity-30 hover:opacity-50 hover:underline flex items-center gap-1"
        onClick={() => setShowFilters((prevState) => !prevState)}
      >
        Filters
        <ChevronDown
          className={cn('w-4 h-4 transition-transform', {
            'rotate-180': showFilters,
          })}
        />
      </button>

      <div
        className={cn(
          'flex flex-col gap-0.5 opacity-0 scale-75 -translate-y-6 transition pointer-events-none',
          {
            'opacity-100 scale-100 translate-y-0 pointer-events-auto':
              showFilters,
          },
        )}
      >
        <Toggle
          data-state={submitStatus === 'not-submitted' ? 'on' : 'off'}
          onClick={() => changeSubmitStatus('not-submitted')}
          className={cn({
            'bg-zinc-300 dark:bg-zinc-800': submitStatus === 'not-submitted',
          })}
        >
          Unsubmitted commits
        </Toggle>
        <Toggle
          data-state={submitStatus === 'submitted' ? 'on' : 'off'}
          onClick={() => changeSubmitStatus('submitted')}
          className={cn({
            'bg-zinc-300 dark:bg-zinc-800': submitStatus === 'submitted',
          })}
        >
          Submitted commits
        </Toggle>
        <Toggle
          data-state={submitStatus === 'all' ? 'on' : 'off'}
          onClick={() => changeSubmitStatus('all')}
          className={cn({
            'bg-zinc-300 dark:bg-zinc-800': submitStatus === 'all',
          })}
        >
          All commits
        </Toggle>
      </div>
    </div>
  )
}
