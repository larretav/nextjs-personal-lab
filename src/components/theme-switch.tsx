"use client";

import { FC, useEffect, useState } from "react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { SunFilledIcon, MoonFilledIcon } from "@/src/components/icons";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSelected = !mounted || theme === "light";
  const showSun = !mounted || !isSelected;

  return (
    <Switch
      aria-label={`Switch to ${isSelected ? "dark" : "light"} mode`}
      className={clsx(
        "px-px transition-opacity hover:opacity-80 cursor-pointer",
        className,
      )}
      isSelected={isSelected}
      onChange={(selected) => setTheme(selected ? "light" : "dark")}
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb>
            <Switch.Icon>
              {showSun ? (
                <SunFilledIcon size={14} />
              ) : (
                <MoonFilledIcon size={14} />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
};
