"use client";

import { ThemeSwitch } from "@/src/components/theme-switch";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto flex max-w-7xl justify-end px-4 py-2">
        <ThemeSwitch />
      </div>
    </header>
  );
};
