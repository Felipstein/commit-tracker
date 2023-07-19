"use client"

import { useState } from "react";
import { CollaboratorAvatar } from "./CollaboratorAvatar";

export interface CollaboratorsListProps {
  usernames: string[],
}

export function CollaboratorsList({ usernames }: CollaboratorsListProps) {
  const [userSelected, setUserSelected] = useState<string | null>(null);

  function handleSelectUsername(username: string) {
    setUserSelected(username);
  }

  function handleCancelSelection() {
    setUserSelected(null);
  }

  return (
    <div className="space-y-2">
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

      <ul className="group flex items-center">

        {usernames.slice(0, 6).map((username, index) => (
          <li key={username}>
            <CollaboratorAvatar
              username={username}
              className={index === 0 ? undefined : "-ml-6 group-hover:ml-1"}
              isSelected={userSelected === username}
              isNotSelected={userSelected ? userSelected !== username : false}
              onSelect={() => handleSelectUsername(username)}
              onCancelSelection={handleCancelSelection}
            />
          </li>
        ))}

        {usernames.length > 6 && (
          <li className="ml-2.5">
            <span className="text-zinc-400 dark:text-zinc-800 text-xs">And more {usernames.length - 6} ...</span>
          </li>
        )}
      </ul>
    </div>
  );
}