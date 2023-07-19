"use client"

import { useMemo, useState } from "react";
import { CollaboratorAvatar } from "./CollaboratorAvatar";
import { cn } from "@/lib/utils";

export interface CollaboratorsListProps {
  usernames: string[],
}

export function CollaboratorsList({ usernames }: CollaboratorsListProps) {
  const [showAll, setShowAll] = useState(false);
  const [userSelected, setUserSelected] = useState<string | null>(null);

  const usernamesList = useMemo(() => {
    const usernamesList = showAll ? usernames : usernames.slice(0, 6);

    if(!showAll && userSelected && !usernamesList.includes(userSelected)) {
      usernamesList.push(userSelected);
    }

    return usernamesList;
  }, [userSelected, showAll, usernames]);

  function handleSelectUsername(username: string) {
    setUserSelected(username);
  }

  function handleCancelSelection() {
    setUserSelected(null);
  }

  return (
    <div className="space-y-2 w-full">
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

      <ul className="relative group/avatar flex items-center w-full">

        {usernamesList.map((username, index) => (
          <li key={username}>
            <CollaboratorAvatar
              username={username}
              className={cn(
                {
                  "-ml-6 group-hover/avatar:ml-1": index > 0,
                  "ml-1": showAll || userSelected,
                },
              )}
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
                className="text-zinc-500 dark:text-zinc-700 hover:text-zinc-400 dark:hover:text-zinc-600 hover:underline text-xs"
                onClick={() => setShowAll(prevState => !prevState)}
              >
                Hide {usernames.length - 6}
              </button>
            )}

            {!showAll && (
              <>
                <span
                  className="text-zinc-400 dark:text-zinc-800 text-xs inline-block group-hover/avatar:hidden"
                >
                  And more {usernames.length - 6} ...
                </span>

                <button
                  type="button"
                  className="text-zinc-500 dark:text-zinc-700 hover:text-zinc-400 dark:hover:text-zinc-600 hover:underline text-xs hidden group-hover/avatar:inline-block"
                  onClick={() => setShowAll(prevState => !prevState)}
                >
                  Show more {usernames.length - 6} ...
                </button>
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}