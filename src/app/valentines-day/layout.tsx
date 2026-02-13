import { ForceTheme } from "@/src/components/ForceTheme";

export const metadata = {
  title: 'Valentines Day',
  description: 'Valentines Day',
}

export default function ValentinesDayLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow valentines-light">
      {children}
      <ForceTheme to="light" />
    </main>
  );
}