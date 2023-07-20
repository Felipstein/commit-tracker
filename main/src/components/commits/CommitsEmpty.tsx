import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export function CommitsEmptyRoot({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'text-zinc-400 dark:text-zinc-500 text-sm text-center m-3',
        className,
      )}
      {...props}
    />
  )
}

export function CommitsEmptyLabel(props: ComponentProps<'span'>) {
  return <span {...props} />
}

export interface CommitsEmptyProps {
  label?: string
}

export function CommitsEmpty({
  label = 'No commits recorded yet',
}: CommitsEmptyProps) {
  return (
    <CommitsEmptyRoot>
      <CommitsEmptyLabel>{label}</CommitsEmptyLabel>
    </CommitsEmptyRoot>
  )
}

CommitsEmpty.Root = CommitsEmptyRoot
CommitsEmpty.Label = CommitsEmptyLabel
