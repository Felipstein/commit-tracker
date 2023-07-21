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
    const [originalValue, setOriginalValue] = React.useState('')

    const ulRef = React.useRef<HTMLUListElement>(null)

    const form = useFormContext()

    const tags = form.watch('tags')

    React.useEffect(() => {
      if (originalValue && tags.length === 0) {
        setOriginalValue('')
      }
    }, [originalValue, tags])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setOriginalValue(event.target.value)

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

    const height = ulRef.current?.getBoundingClientRect().height ?? 0

    return (
      <div className="relative">
        <input
          spellCheck={false}
          type={type}
          className={cn(
            'min-h-10 flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-transparent ring-offset-background selection:invisible placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          style={{
            height: Math.max(40, height),
          }}
          ref={ref}
          value={originalValue}
          onChange={handleChange}
          placeholder="Put here some tags separated by spaces or commas"
          {...props}
        />

        <ul
          ref={ulRef}
          className="pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 flex-wrap items-center gap-2 px-3 py-2"
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
