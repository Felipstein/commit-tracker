import { create } from "zustand";

export interface CommitsFilterStore {
  byUsername: string | null,
  onlyNotSubmitted: boolean | null,
  setByUsername: (byUsername: string) => void,
  removeByUsername: () => void,
  setOnlyNotSubmitted: (onlyNotSubmitted: boolean) => void,
  removeOnlyNotSubmitted: () => void,
}

export const useCommitsFilterStore = create<CommitsFilterStore>((set) => ({
  byUsername: null,
  onlyNotSubmitted: null,

  setByUsername: (byUsername) => set(() => ({ byUsername })),
  setOnlyNotSubmitted: (onlyNotSubmitted) => set(() => ({ onlyNotSubmitted })),

  removeByUsername: () => set(() => ({ byUsername: null })),
  removeOnlyNotSubmitted: () => set(() => ({ onlyNotSubmitted: null })),
}));