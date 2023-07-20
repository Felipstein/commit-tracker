import { cn } from '@/lib/utils'
import Image from 'next/image'
import { ReactNode } from 'react'

export interface GithubAvatarPresentationalRootProps {
  className?: string
  children: ReactNode
}

export function GithubAvatarPresentationalRoot({
  className,
  children,
}: GithubAvatarPresentationalRootProps) {
  return (
    <div
      className={cn(
        'flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900',
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface GithubAvatarPresentationalImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function GithubAvatarPresentationalImage({
  src,
  alt,
  width = 32,
  height = 32,
  className,
}: GithubAvatarPresentationalImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('rounded-full', className)}
    />
  )
}

export function GithubAvatarPresentational(
  props: GithubAvatarPresentationalImageProps,
) {
  return (
    <GithubAvatarPresentationalRoot>
      <GithubAvatarPresentationalImage {...props} />
    </GithubAvatarPresentationalRoot>
  )
}

GithubAvatarPresentational.Root = GithubAvatarPresentationalRoot
GithubAvatarPresentational.Image = GithubAvatarPresentationalImage
