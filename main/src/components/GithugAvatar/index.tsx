import { GithubAvatarServerSide } from "./GithugAvatarServerSide";
import { GithubAvatarClientSide } from "./GithugAvatarClientSide";

export interface GithubUser {
  login: string,
  avatar_url: string,
}

export interface GithubAvatarProps {
  username: string,
  width?: number,
  height?: number,
  className?: string,
  classNameForImage?: string,
}

export function GithubAvatar({ clientSide = false, ...props }: GithubAvatarProps & { clientSide?: boolean }) {

  if(clientSide) {
    return (
      <GithubAvatarClientSide {...props} />
    );
  }

  return (
    <GithubAvatarServerSide {...props}/>
  );
}