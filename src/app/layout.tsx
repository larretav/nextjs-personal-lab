import "@/src/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans, lora, playfair } from "@/src/config/fonts";

export const metadata: Metadata = {
  title: {
    default: "Personal Lab",
    template: `%s - Home`,
  },
  description: "Registro de proyectos y experimentos web personales.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          playfair.variable,
          lora.variable
        )}
      >
        <Providers themeProps={{ attribute: "data-theme", defaultTheme: "dark" }}>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
