import { ForceTheme } from "@/src/components/ForceTheme";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'San Valentín - Una Invitación Especial',
  description: 'Una invitación especial para ti este San Valentín',
}

export default function ValentinesDayLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-7xl px-6 flex-grow valentines-light">
      {children}
      <ForceTheme to="light" />
    </main>
  );
}