import "@/src/styles/globals.css";

import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { fontSans, lora, playfair } from "@/src/config/fonts";
// import { Navbar } from "@/src/components/navbar";

export const metadata: Metadata = {
  title: {
    default: "Personal Lab",
    template: `%s - Home`,
  },
  description: "Página principal de mini proyectos diferentes",
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
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
