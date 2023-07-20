import { GithubAvatarProps, GithubUser } from '.'
import { GithubAvatarPresentational } from './GithubAvatarPresentational'

export async function GithubAvatarServerSide({
  username,
  width,
  height,
  className,
  classNameForImage,
}: GithubAvatarProps) {
  const response = await fetch(`https://api.github.com/users/${username}`)

  const githubUser = (await response.json()) as GithubUser

  return (
    <GithubAvatarPresentational.Root className={className}>
      <GithubAvatarPresentational.Image
        src={githubUser.avatar_url}
        alt={`${githubUser.login} Avatar`}
        width={width}
        height={height}
        className={classNameForImage}
      />
    </GithubAvatarPresentational.Root>
  )
}
