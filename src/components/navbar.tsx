"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
} from "@heroui/react";
import { ThemeSwitch } from "@/src/components/theme-switch";

export const Navbar = () => {

  return (
    <HeroUINavbar  maxWidth="xl" position="sticky" >
      
      <NavbarContent justify="end">
        <ThemeSwitch />
      </NavbarContent>

    </HeroUINavbar>
  );
};
