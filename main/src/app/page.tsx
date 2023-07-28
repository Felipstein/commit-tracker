import { CommitsList } from '@/components/commits/CommitsList'
import { prisma } from '@/lib/prisma'
import { CollaboratorsList } from './components/CollaboratorsList'
import { SubmitCommits } from './components/SubmitCommits'
import { CommitSubmittedToggle } from './components/CommitSubmittedToggle'
import { CommitsStoreInitializer } from '@/stores/initializers/CommitsStoreInitializer'
import { CommitWithSubmitInfo } from '@/@types/commit.type'
import commitsInJson from '../../tmp/commits.json'
import { Separator } from '@/components/ui/separator'

export default async function HomePage() {
  // const commits = await prisma.commit.findMany({
  //   include: { submitInfo: true },
  //   orderBy: { committedAt: 'desc' },
  // })

  const commits = commitsInJson.sort(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (a, b) => new Date(b.committedAt) - new Date(a.committedAt),
  ) as unknown as CommitWithSubmitInfo[]

  const users = Array.from(new Set(commits.map((commit) => commit.authorName)))

  return (
    <>
      <CommitsStoreInitializer commits={commits as CommitWithSubmitInfo[]} />

      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-12">
          <header className="flex items-center justify-between gap-4">
            <CollaboratorsList usernames={users} />

            <div className="hidden max-[1365px]:block">
              <CommitSubmittedToggle />
            </div>
          </header>

          <main className="relative flex w-full">
            {/* Left Nav */}
            <aside className="absolute -left-14 top-4 hidden -translate-x-full min-[1366px]:block">
              <CommitSubmittedToggle />
            </aside>

            <div className="relative m-auto flex w-fit flex-col items-start gap-14 lg:flex-row lg:gap-20">
              {/* Left Content */}
              <div className="h-fit w-[400px] lg:h-[60vh]">
                <CommitsList />
              </div>

              <Separator className="bg-zinc-200 dark:bg-zinc-900 lg:hidden" />

              {/* Right Content */}
              <SubmitCommits />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
