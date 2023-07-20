import { CommitsList } from '@/components/commits/CommitsList'
import { prisma } from '@/lib/prisma'
import { CollaboratorsList } from './components/CollaboratorsList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SubmitCommits } from './components/SubmitCommits'
import { CommitSubmittedToggle } from './components/CommitSubmittedToggle'

export default async function HomePage() {
  const commits = await prisma.commit.findMany({
    include: { submitInfo: true },
  })

  const users = Array.from(new Set(commits.map((commit) => commit.authorName)))

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-12">
        <header className="flex items-center justify-between gap-4">
          <CollaboratorsList usernames={users} />
        </header>

        <main className="relative w-full flex">
          {/* Left Nav */}
          <aside className="absolute -left-14 -translate-x-full top-4">
            <CommitSubmittedToggle />
          </aside>

          <div className="relative m-auto flex w-fit items-start gap-20">
            {/* Left Content */}
            <ScrollArea className="h-[60vh] w-full">
              <CommitsList commits={commits} />
            </ScrollArea>

            {/* Right Content */}
            <SubmitCommits commits={commits} />
          </div>
        </main>
      </div>
    </div>
  )
}
