import { CommitsList } from "@/components/commits/CommitsList";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {

  const commits = await prisma.commit.findMany();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <CommitsList commits={commits} />
    </div>
  );
}