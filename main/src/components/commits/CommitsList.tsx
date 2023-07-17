import { Commit } from "@prisma/client"
import { CommitCard } from "./CommitCard";

const commits: Commit[] = [
  {
    id: '1',
    hash: 'dawjdawidjawidwa',
    message: 'feat: omg, this is a commit example!'
  },
  {
    id: '2',
    hash: 'dawjdawidjawidwa',
    message: 'feat: omg, this is a commit example!'
  },
  {
    id: '3',
    hash: 'dawjdawidjawidwa',
    message: 'feat: omg, this is a commit example!'
  },
  {
    id: '4',
    hash: 'dawjdawidjawidwa',
    message: 'feat: omg, this is a commit example!'
  },
  {
    id: '5',
    hash: 'dawjdawidjawidwa',
    message: 'feat: omg, this is a commit example!'
  },
  {
    id: '6',
    hash: 'dawjdawidjawidwa',
    message: 'feat: omg, this is a commit example!'
  },
]

export function CommitsList() {
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