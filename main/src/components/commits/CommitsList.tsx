import { Commit } from "@prisma/client"

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
        {commits.map((commit, index) => {
          const isNotLast = index !== commits.length - 1;

          return (
            <li key={commit.id}>
              <div className="relative pb-8">
                {isNotLast && (
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                )}

                {/* Content */}
                <div className="relative flex items-center space-x-3">

                  {/* Left Circle */}
                  <div>
                    <div className="relative px-1">
                      <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                        <div className='w-5 h-5 text-gray-500' />
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-900">
                        {commit.message}
                      </span>

                      <span className="text-xs font-medium text-gray-900">
                        {commit.hash}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  )
}