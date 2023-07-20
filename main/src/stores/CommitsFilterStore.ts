import { create } from 'zustand'

export interface CommitsFilterStore {
  byUsername: string | null
  submitStatus: 'all' | 'submitted' | 'not-submitted'
  setByUsername: (byUsername: string) => void
  removeByUsername: () => void
  changeSubmitStatus: (status: 'all' | 'submitted' | 'not-submitted') => void
}

export const useCommitsFilterStore = create<CommitsFilterStore>((set) => ({
  byUsername: null,
  submitStatus: 'not-submitted',

  setByUsername: (byUsername) => set(() => ({ byUsername })),
  removeByUsername: () => set(() => ({ byUsername: null })),

  changeSubmitStatus: (status) => set(() => ({ submitStatus: status })),
}))
