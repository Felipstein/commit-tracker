import { CommitsList } from '@/components/commits/CommitsList'
import { prisma } from '@/lib/prisma'
import { CollaboratorsList } from './components/CollaboratorsList'
import { SubmitCommits } from './components/SubmitCommits'
import { CommitSubmittedToggle } from './components/CommitSubmittedToggle'
import { CommitsStoreInitializer } from '@/stores/initializers/CommitsStoreInitializer'
import { CommitWithSubmitInfo } from '@/@types/commit.type'
import commitsInJson from '../../tmp/commits.json'

export default async function HomePage() {
  // const commits = await prisma.commit.findMany({
  //   include: { submitInfo: true },
  //   orderBy: { committedAt: 'desc' },
  // })

  const commits = commitsInJson.sort((currentCommit, nextCommit) =>
    new Date(currentCommit.committedAt) < new Date(nextCommit.committedAt)
      ? 1
      : -1,
  ) as unknown as CommitWithSubmitInfo[]

  const users = Array.from(new Set(commits.map((commit) => commit.authorName)))

  return (
    <>
      <CommitsStoreInitializer commits={commits as CommitWithSubmitInfo[]} />

      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-12">
          <header className="flex items-center justify-between gap-4">
            <CollaboratorsList usernames={users} />
          </header>

          <main className="relative flex w-full">
            {/* Left Nav */}
            <aside className="absolute -left-14 top-4 -translate-x-full">
              <CommitSubmittedToggle />
            </aside>

            <div className="relative m-auto flex w-fit items-start gap-20">
              {/* Left Content */}
              <div className="h-[60vh] w-[400px]">
                <CommitsList />
              </div>

              {/* Right Content */}
              <SubmitCommits />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
