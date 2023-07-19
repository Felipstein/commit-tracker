import { GithubAvatar } from "@/components/GithubAvatar";
import { CommitsList } from "@/components/commits/CommitsList";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function HomePage() {

  const commits = await prisma.commit.findMany();

  const users = Array.from(new Set(commits.map(commit => commit.authorName)));

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="space-y-12">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-sm text-zinc-400 dark:text-zinc-700">
              Collaborators ({users.length})
            </h3>

            <ul className="flex items-center">
              {users.slice(0, 6).map((user, index) => (
                <li key={user}>
                  <GithubAvatar
                    username={user}
                    width={64}
                    height={64}
                    className={cn(
                      "w-14 h-14 p-2 bg-zinc-50 dark:bg-zinc-950",
                      {
                        "-ml-4": index > 0
                      },
                    )}
                  />
                </li>
              ))}

              {users.length > 6 && (
                <li className="ml-2.5">
                  <span className="text-zinc-400 dark:text-zinc-800 text-xs">And more {users.length - 6} ...</span>
                </li>
              )}
            </ul>
          </div>
        </header>

        <main className="m-auto">
          <CommitsList commits={commits} />
        </main>
      </div>
    </div>
  );
}