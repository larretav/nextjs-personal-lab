import { Fira_Code as FontMono, Inter as FontSans, Lora, Playfair_Display } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
})
