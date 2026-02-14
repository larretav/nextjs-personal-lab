'use client';
import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react'

type Props = {
  to: "light" | "dark";
}

export const ForceTheme = ({ to = "light" }: Props) => {

  const { theme, setTheme } = useTheme();
  const previousTheme = useRef<string | undefined>();

  useEffect(() => {
    previousTheme.current = theme;
    setTheme(to);

    return () => {
      setTheme(previousTheme.current ?? to);
    };
  }, []);

  return null;

}
// 