import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface LoaderIconProps {
  className?: string
}

export function LoaderIcon({ className }: LoaderIconProps) {
  return <Loader2 className={cn('animate-spin', className)} />
}
