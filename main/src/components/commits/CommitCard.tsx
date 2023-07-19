import { Commit } from "@prisma/client";
import { Clock4 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { GithubAvatar } from "../GithugAvatar";

export interface CommitCardProps {
  commit: Commit,
  isLast: boolean,
}

export function CommitCard({ commit, isLast }: CommitCardProps) {

  return (
    <div className="relative pb-8">
      {!isLast && (
        <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-zinc-200 dark:bg-zinc-800" aria-hidden="true" />
      )}

      {/* Content */}
      <div className="relative flex items-center space-x-3">

        {/* Left Circle */}
        <div>
          <div className="relative px-1">
            <GithubAvatar username={commit.authorName} />
          </div>
        </div>

        {/* Right Content */}
        <Link
          href={commit.redirectUrl}
          target="_blank"
          className="flex-1 hover:bg-zinc-100 dark:hover:bg-zinc-900/20 rounded-md p-2 w-96"
        >
          <div className="flex flex-col items-start gap-1 truncate">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50 truncate">
              {commit.message}
            </span>

            <footer className="flex items-end gap-2.5">
              <span className="text-xs text-zinc-400 dark:text-zinc-600">
                committed by{' '}
                  <strong className="font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline">
                    <Link href={`https://github.com/${commit.authorName}`} target="_blank">
                      {commit.authorName}
                    </Link>
                  </strong>
              </span>

              <time className="text-[10px] text-zinc-400 dark:text-zinc-600 flex items-center gap-1">
                <Clock4 className="w-3 h-3" />
                {moment(commit.committedAt).fromNow()}
              </time>
            </footer>
          </div>
        </Link>
      </div>
    </div>
  );
}