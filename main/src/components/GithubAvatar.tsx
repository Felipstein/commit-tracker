import { cn } from "@/lib/utils";
import Image from "next/image";

interface GithubUser {
  login: string,
  avatar_url: string,
}

export interface GithubAvatarProps {
  username: string,
  width?: number,
  height?: number,
  className?: string,
}

export async function GithubAvatar({ username, width = 32, height = 32, className }: GithubAvatarProps) {

  const response = await fetch(`https://api.github.com/users/${username}`);

  const githubUser = await response.json() as GithubUser;

  return (
    <div className={cn(
      "h-8 w-8 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden",
      className,
    )}>
      <Image
        src={githubUser.avatar_url}
        alt={`${githubUser.login} Avatar`}
        width={width}
        height={height}
        className="rounded-full"
      />
    </div>
  );
}