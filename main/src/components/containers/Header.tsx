import { ToggleThemeSwitch } from "../ToggleThemeSwitch";

export function Header() {

  return (
    <header className="max-w-7xl p-8 w-full m-auto flex justify-end">
      <ToggleThemeSwitch />
    </header>
  );
}