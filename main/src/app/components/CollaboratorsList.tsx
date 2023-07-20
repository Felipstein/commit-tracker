'use client'

import { useMemo, useState } from 'react'
import { CollaboratorAvatar } from './CollaboratorAvatar'
import { cn } from '@/lib/utils'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'

export interface CollaboratorsListProps {
  usernames: string[]
}

export function CollaboratorsList({ usernames }: CollaboratorsListProps) {
  const setByUsername = useCommitsFilterStore((s) => s.setByUsername)
  const removeByUsername = useCommitsFilterStore((s) => s.removeByUsername)

  const [showAll, setShowAll] = useState(false)
  const [userSelected, setUserSelected] = useState<string | null>(null)

  const usernamesList = useMemo(() => {
    const usernamesList = showAll ? usernames : usernames.slice(0, 6)

    if (!showAll && userSelected && !usernamesList.includes(userSelected)) {
      usernamesList.push(userSelected)
    }

    return usernamesList
  }, [userSelected, showAll, usernames])

  function handleSelectUsername(username: string) {
    setUserSelected(username)
    setByUsername(username)
  }

  function handleCancelSelection() {
    setUserSelected(null)
    removeByUsername()
  }

  return (
    <div className="w-full space-y-2">
      <header className="flex items-center gap-2.5">
        <h3 className="text-sm text-zinc-400 dark:text-zinc-700">
          Collaborators ({usernames.length})
        </h3>

        {userSelected && (
          <span className="text-xs text-zinc-300 dark:text-zinc-800">
            Filtering by {userSelected}
          </span>
        )}
      </header>

      <ul className="group/avatar flex w-full items-center">
        {usernamesList.map((username, index) => (
          <li key={username}>
            <CollaboratorAvatar
              username={username}
              className={cn({
                '-ml-6 group-hover/avatar:ml-1': index > 0,
                'ml-1': showAll || userSelected,
              })}
              isSelected={userSelected === username}
              isNotSelected={userSelected ? userSelected !== username : false}
              onSelect={() => handleSelectUsername(username)}
              onCancelSelection={handleCancelSelection}
            />
          </li>
        ))}

        {usernames.length > 6 && (
          <li className="ml-2.5 w-24">
            {showAll && (
              <button
                type="button"
                className="text-xs text-zinc-500 hover:text-zinc-400 hover:underline dark:text-zinc-700 dark:hover:text-zinc-600"
                onClick={() => setShowAll((prevState) => !prevState)}
              >
                Hide {usernames.length - 6}
              </button>
            )}

            {!showAll && (
              <>
                <span className="inline-block text-xs text-zinc-400 group-hover/avatar:hidden dark:text-zinc-800">
                  And more {usernames.length - 6} ...
                </span>

                <button
                  type="button"
                  className="hidden text-xs text-zinc-500 hover:text-zinc-400 hover:underline group-hover/avatar:inline-block dark:text-zinc-700 dark:hover:text-zinc-600"
                  onClick={() => setShowAll((prevState) => !prevState)}
                >
                  Show more {usernames.length - 6} ...
                </button>
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}
