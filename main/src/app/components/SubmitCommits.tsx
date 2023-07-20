import { SubmitCommitsForm } from "./forms/SubmitCommitsForm";

export interface SubmitCommitsProps {
  totalCommits: number,
}

export function SubmitCommits({ totalCommits }: SubmitCommitsProps) {
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="whitespace-nowrap text-2xl font-semibold text-zinc-500 dark:text-zinc-300">
          Submit Commits
        </h1>

        <span className='text-xs opacity-40'>{totalCommits} unsubmitted commit{totalCommits > 1 ? 's' : ''}</span>
      </header>

      <SubmitCommitsForm />
    </div>
  )
}
