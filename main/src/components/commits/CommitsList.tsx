import { Commit } from "@prisma/client";
import { CommitCard } from "./CommitCard";

export interface CommitsListProps {
  commits: Commit[],
}

export function CommitsList({ commits }: CommitsListProps) {

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">

        {commits.map((commit, index) => (
          <li key={commit.id}>
            <CommitCard commit={commit} isLast={index === commits.length - 1} />
          </li>
        ))}

      </ul>
    </div>
  )
}