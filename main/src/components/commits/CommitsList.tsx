import { Commit } from "@prisma/client";
import { CommitCard } from "./CommitCard";
import { CommitsEmpty } from "./CommitsEmpty";

export interface CommitsListProps {
  commits: Commit[],
}

export function CommitsList({ commits }: CommitsListProps) {

  if(commits.length === 0) {
    return (
      <CommitsEmpty />
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8 max-w-[400px]">

        {commits.map((commit, index) => (
          <li key={commit.id}>
            <CommitCard commit={commit} isLast={index === commits.length - 1} />
          </li>
        ))}

      </ul>
    </div>
  )
}