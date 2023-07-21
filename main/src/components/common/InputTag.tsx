import * as React from 'react'

import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { Badge } from '../ui/badge'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'placeholder' | 'value'
> & {
  onChange?: (tags: string[]) => void
}

const InputTag = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, ...props }, ref) => {
    const ulRef = React.useRef<HTMLUListElement>(null)

    const form = useFormContext()

    const tags = form.watch('tags')

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      // Remove repeated spaces
      const cleanValue = event.target.value
        .replace(/,/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      const tags = Array.from(
        new Set(cleanValue.split(' ').filter((tag) => tag !== '')),
      )

      onChange?.(tags)
      form.setValue('tags', tags, { shouldValidate: true })
    }

    const height = ulRef.current?.getBoundingClientRect().height ?? NaN

    return (
      <div className="relative">
        <input
          spellCheck={false}
          type={type}
          className={cn(
            'flex min-h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-transparent selection:invisible',
            className,
          )}
          style={{
            height: Math.max(40, height),
          }}
          ref={ref}
          onChange={handleChange}
          placeholder="Put here some tags separated by spaces or commas"
          {...props}
        />

        <ul
          ref={ulRef}
          className="absolute flex items-center gap-2 flex-wrap top-1/2 -translate-y-1/2 w-full py-2 px-3 pointer-events-none"
        >
          {tags.map((tag: string) => (
            <li key={tag}>
              <Badge className="flex border-zinc-200 bg-zinc-100/60 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-50">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    )
  },
)
InputTag.displayName = 'InputTag'

export { InputTag }
