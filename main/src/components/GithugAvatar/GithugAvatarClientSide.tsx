"use client"

import { GithubAvatarProps, GithubUser } from ".";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "../common/LoaderIcon";
import { GithubAvatarPresentational } from "./GithubAvatarPresentational";

export function GithubAvatarClientSide({ username, width, height, className, classNameForImage }: GithubAvatarProps) {

  const {
    data: githubUser,
    isLoading,
  } = useQuery(
    ["github-avatar", username],
    async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
    
      return await response.json() as GithubUser;
    },
    {
      staleTime: 5 * 60 * 1000,
    },
  );

  return (
    <GithubAvatarPresentational.Root className={className}>
      {isLoading && (
        <LoaderIcon className="w-6 h-6 text-zinc-400 dark:text-zinc-800" />
      )}

      {!isLoading && githubUser && (
        <GithubAvatarPresentational.Image
          src={githubUser.avatar_url}
          alt={`${githubUser.login} Avatar`}
          width={width}
          height={height}
          className={classNameForImage}
        />
      )}
    </GithubAvatarPresentational.Root>
  );
}