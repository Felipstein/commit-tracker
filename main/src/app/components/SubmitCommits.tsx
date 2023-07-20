import { Commit } from "@prisma/client";
import { SubmitCommitsForm } from "./forms/SubmitCommitsForm";

export interface SubmitCommitsProps {
  commits: Commit[],
}

export function SubmitCommits({ commits }: SubmitCommitsProps) {
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="whitespace-nowrap text-2xl font-semibold text-zinc-500 dark:text-zinc-300">
          Submit Commits
        </h1>

        <span className='text-xs opacity-40'>{commits.length} unsubmitted commit{commits.length > 1 ? 's' : ''}</span>
      </header>

      <SubmitCommitsForm commits={commits} />
    </div>
  )
}
