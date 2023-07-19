"use client"

import { Commit } from "@prisma/client";
import { CommitCard } from "./CommitCard";
import { CommitsEmpty } from "./CommitsEmpty";
import { useCommitsFilterStore } from "@/stores/CommitsFilterStore";
import { useMemo } from "react";

export interface CommitsListProps {
  commits: Commit[],
}

export function CommitsList({ commits }: CommitsListProps) {

  const byUsername = useCommitsFilterStore((s) => s.byUsername);

  const commitsFiltered = useMemo(() => (
    byUsername ? commits.filter(commit => commit.authorName === byUsername) : commits
  ), [commits, byUsername]);

  if(commits.length === 0) {
    return (
      <CommitsEmpty />
    );
  }

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8 max-w-[400px]">

        {commitsFiltered.map((commit, index) => (
          <li key={commit.id}>
            <CommitCard commit={commit} isLast={index === commitsFiltered.length - 1} />
          </li>
        ))}

      </ul>
    </div>
  )
}