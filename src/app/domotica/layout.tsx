import "./theme.css";

export default function DomoticaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="domotica-theme min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">{children}</div>
    </div>
  );
}
