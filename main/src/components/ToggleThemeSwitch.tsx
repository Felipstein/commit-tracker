"use client"

import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";
import { LightbulbIcon, MoonIcon } from "lucide-react";

export function ToggleThemeSwitch() {

  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {theme === 'light' && (
        <LightbulbIcon className="w-5 h-5 opacity-60" />
      )}

      {theme === 'dark' && (
        <MoonIcon className="w-5 h-5 opacity-40" />
      )}

      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="dark:bg-zinc-800 dark:text-zinc-800"
      />
    </div>
  );
}