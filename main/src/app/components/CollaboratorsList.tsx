'use client'

import { useEffect, useMemo, useState } from 'react'
import { CollaboratorAvatar } from './CollaboratorAvatar'
import { cn } from '@/lib/utils'
import { useCommitsFilterStore } from '@/stores/CommitsFilterStore'

export interface CollaboratorsListProps {
  usernames: string[]
}

export function CollaboratorsList({ usernames }: CollaboratorsListProps) {
  const byUsername = useCommitsFilterStore((s) => s.byUsername)
  const setByUsername = useCommitsFilterStore((s) => s.setByUsername)
  const removeByUsername = useCommitsFilterStore((s) => s.removeByUsername)

  const [showAll, setShowAll] = useState(false)

  const usernamesList = useMemo(() => {
    const usernamesList = showAll ? usernames : usernames.slice(0, 6)

    if (!showAll && byUsername && !usernamesList.includes(byUsername)) {
      usernamesList.push(byUsername)
    }

    return usernamesList
  }, [showAll, byUsername, usernames])

  useEffect(() => {
    const username = localStorage.getItem('username-filter')

    if (username) {
      setByUsername(username)
    }
  }, [setByUsername])

  useEffect(() => {
    if (usernamesList.length === 1) {
      const username = usernamesList[0]

      setByUsername(username)
      localStorage.setItem('username-filter', username)
    }
  }, [usernamesList, setByUsername])

  function handleSelectUsername(username: string) {
    setByUsername(username)
    localStorage.setItem('username-filter', username)
  }

  function handleCancelSelection() {
    removeByUsername()
    localStorage.removeItem('username-filter')
  }

  if (usernames.length === 0) {
    return null
  }

  return (
    <div className="space-y-2">
      <header className="flex items-center gap-2.5">
        <h3 className="text-sm text-zinc-400 dark:text-zinc-700">
          {usernames.length > 1
            ? `Collaborators (${usernames.length})`
            : 'Collaborator'}
        </h3>

        {usernames.length === 1 && (
          <span className="text-xs text-zinc-300 dark:text-zinc-800">
            {usernames[0]}
          </span>
        )}

        {usernames.length > 1 && byUsername && (
          <span className="text-xs text-zinc-300 dark:text-zinc-800">
            Filtering by {byUsername}
          </span>
        )}
      </header>

      <ul className="group/avatar flex w-full items-center">
        {usernamesList.map((username, index) => (
          <li key={username}>
            <CollaboratorAvatar
              username={username}
              className={
                usernames.length > 1
                  ? cn({
                      '-ml-6 group-hover/avatar:ml-1': index > 0,
                      'ml-1': showAll || byUsername,
                    })
                  : undefined
              }
              isSelected={byUsername === username}
              isNotSelected={byUsername ? byUsername !== username : false}
              onSelect={() => handleSelectUsername(username)}
              onCancelSelection={handleCancelSelection}
              interactionDisabled={usernames.length === 1}
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
