import Link from "next/link";
import { buttonVariants, Card, Chip } from "@heroui/react";

import { ThemeSwitch } from "@/src/components/theme-switch";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Personal Lab
            </h1>
            <p className="mt-2 max-w-md text-muted">
              Proyectos y experimentos que voy armando por diversión.
            </p>
          </div>
          <ThemeSwitch className="mt-2 shrink-0" />
        </header>

        <div className="mt-10 flex flex-col gap-4">
          <Card className="w-full">
            <Card.Header>
              <Card.Title>San Valentín</Card.Title>
              <Card.Description>
                Una invitación con más drama del necesario y un botón que se
                niega a cooperar.
              </Card.Description>
            </Card.Header>
            <Card.Footer className="items-center justify-between">
              <Chip color="success" variant="soft">
                Abierto
              </Chip>
              <Link
                href="/valentines-day"
                className={buttonVariants({ size: "sm" })}
              >
                Abrir
              </Link>
            </Card.Footer>
          </Card>

          <Card className="w-full">
            <Card.Header>
              <Card.Title>Catálogo domótico</Card.Title>
              <Card.Description>
                Ficha técnica de sistemas de hogar inteligente, para no tener
                que leer manuales de fabricante.
              </Card.Description>
            </Card.Header>
            <Card.Footer className="items-center justify-between">
              <Chip color="success" variant="soft">
                Abierto
              </Chip>
              <Link href="/domotica" className={buttonVariants({ size: "sm" })}>
                Abrir
              </Link>
            </Card.Footer>
          </Card>

          <Card className="w-full" variant="transparent">
            <Card.Header>
              <Card.Title>Próxima entrada</Card.Title>
              <Card.Description>Todavía en blanco.</Card.Description>
            </Card.Header>
            <Card.Footer>
              <Chip variant="soft">En camino</Chip>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
}
