import { CommitWithSubmitInfo } from '@/@types/commit.type'
import { create } from 'zustand'

export interface CommitsStore {
  commits: CommitWithSubmitInfo[]
  commitIdsSelected: string[]

  toggleSelectCommitId: (id: string) => void
  toggleSelectAllCommitIds: () => void
}

export const useCommitsStore = create<CommitsStore>((set) => ({
  commits: [],
  commitIdsSelected: [],

  toggleSelectCommitId: (id) =>
    set(({ commitIdsSelected }) => ({
      commitIdsSelected: commitIdsSelected.includes(id)
        ? commitIdsSelected.filter((commitId) => commitId !== id)
        : [...commitIdsSelected, id],
    })),

  toggleSelectAllCommitIds: () =>
    set(({ commitIdsSelected, commits }) => ({
      commitIdsSelected:
        commitIdsSelected.length ===
        commits.filter((commit) => !commit.submitInfo).length
          ? []
          : commits
              .filter((commit) => !commit.submitInfo)
              .map((commit) => commit.id),
    })),
}))
