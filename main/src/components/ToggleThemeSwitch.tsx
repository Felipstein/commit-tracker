'use client'

import { useTheme } from 'next-themes'
import { Switch } from './ui/switch'

import { LightbulbIcon, MoonIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ToggleThemeSwitch() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {theme === 'light' && <LightbulbIcon className="h-5 w-5 opacity-60" />}

      {theme === 'dark' && <MoonIcon className="h-5 w-5 opacity-40" />}

      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="dark:bg-zinc-800 dark:text-zinc-800"
      />
    </div>
  )
}
