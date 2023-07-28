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
    <div className="relative flex flex-col gap-2">
      <button
        type="button"
        className="flex items-center gap-1 text-xs opacity-30 hover:underline hover:opacity-50"
        onClick={() => setShowFilters((prevState) => !prevState)}
      >
        Filters
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', {
            'rotate-180': showFilters,
          })}
        />
      </button>

      <div
        className={cn(
          'pointer-events-none right-0 top-6 flex -translate-y-6 scale-75 flex-col gap-0.5 opacity-0 transition max-[1366px]:absolute',
          {
            'pointer-events-auto translate-y-0 scale-100 opacity-100':
              showFilters,
          },
        )}
      >
        <Toggle
          data-state={submitStatus === 'not-submitted' ? 'on' : 'off'}
          onClick={() => changeSubmitStatus('not-submitted')}
          className={cn('whitespace-nowrap', {
            'bg-zinc-300 dark:bg-zinc-800': submitStatus === 'not-submitted',
          })}
        >
          Unsubmitted commits
        </Toggle>
        <Toggle
          data-state={submitStatus === 'submitted' ? 'on' : 'off'}
          onClick={() => changeSubmitStatus('submitted')}
          className={cn('whitespace-nowrap', {
            'bg-zinc-300 dark:bg-zinc-800': submitStatus === 'submitted',
          })}
        >
          Submitted commits
        </Toggle>
        <Toggle
          data-state={submitStatus === 'all' ? 'on' : 'off'}
          onClick={() => changeSubmitStatus('all')}
          className={cn('whitespace-nowrap', {
            'bg-zinc-300 dark:bg-zinc-800': submitStatus === 'all',
          })}
        >
          All commits
        </Toggle>
      </div>
    </div>
  )
}
