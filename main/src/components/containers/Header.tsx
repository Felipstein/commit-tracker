import { ToggleThemeSwitch } from '../ToggleThemeSwitch'

export function Header() {
  return (
    <header className="m-auto flex w-full max-w-7xl justify-end p-8">
      <ToggleThemeSwitch />
    </header>
  )
}
