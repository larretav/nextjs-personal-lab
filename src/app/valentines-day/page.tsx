import { FloatingHearts } from "./_components/FloatingHearts";
import { ValentineInvitation } from "./_components/ValentineInvitation";

export default function ValentinesDayPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-rose-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto sm:px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Una invitación especial
          </p>
          <h1
            className="text-5xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            San Valentín
          </h1>
          <div className="flex items-center justify-center gap-4 text-rose-500">
            <div className="w-16 h-0.5 bg-rose-500/40" />
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="w-16 h-0.5 bg-rose-500/40" />
          </div>
        </div>

        {/* Invitation Card */}
        <div className="px-4">
          <ValentineInvitation />
        </div>

        {/* Footer Decoration */}
        <div className="mt-12 text-center px-6">
          <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-lora)' }}>
            Hecho con amor (y un poco de Vibe Coding) para ti ☺️
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <svg className="w-4 h-4 text-rose-500/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg className="w-4 h-4 text-rose-500/40" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg className="w-4 h-4 text-rose-500/60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}