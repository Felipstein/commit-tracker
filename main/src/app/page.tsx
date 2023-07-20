import { CommitsList } from '@/components/commits/CommitsList'
import { prisma } from '@/lib/prisma'
import { CollaboratorsList } from './components/CollaboratorsList'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SubmitCommits } from './components/SubmitCommits'

export default async function HomePage() {

  const commits = await prisma.commit.findMany({
    where: { submitInfo: { is: null } },
  });

  const users = Array.from(new Set(commits.map((commit) => commit.authorName)))

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="space-y-12">
        <header className="flex items-center justify-between gap-4">
          <CollaboratorsList usernames={users} />
        </header>

        <main className="relative m-auto flex w-fit items-start gap-20">
          {/* Left Content */}
          <ScrollArea className="h-[70vh] w-full">
            <CommitsList commits={commits} />
          </ScrollArea>

          {/* Right Content */}
          <SubmitCommits
            commits={commits}
          />
        </main>
      </div>
    </div>
  )
}
