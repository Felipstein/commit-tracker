import { CommitsList } from "@/components/commits/CommitsList";

export default function HomePage() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <CommitsList />
    </div>
  );
}