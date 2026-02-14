"use client"

import { useState, useRef, useCallback } from "react"
import { Button, Card, CardBody, Image } from "@heroui/react"

export function ValentineInvitation() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [response, setResponse] = useState<"yes" | "no" | null>(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const handleNoButtonHover = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const button = noButtonRef.current.getBoundingClientRect()

    const maxX = container.width - button.width - 40
    const maxY = 150

    // Generate position that's at least 100px away from current position
    let newX: number
    let newY: number

    do {
      newX = (Math.random() - 0.5) * maxX
      newY = (Math.random() - 0.5) * maxY
    } while (
      Math.abs(newX - noButtonPosition.x) < 100 &&
      Math.abs(newY - noButtonPosition.y) < 50
    )

    setNoButtonPosition({ x: newX, y: newY })
  }, [noButtonPosition.x, noButtonPosition.y])

  if (response === "yes") {
    return (
      <Card className="max-w-lg mx-auto bg-content1/10 backdrop-blur-sm border border-rose-500/20 shadow-2xl rounded-2xl">
        <CardBody className="p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-500 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            ¡Siiiii, vamos por tacoos!
          </h2>
          <Image
            width="270" height="480"
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmE2eWx3dmdiZ3F2Ymw1NTRwbDh5dnVnZzdsb3A3dm8wODY0aHNsZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3rgXBxX4myufzT6N2w/giphy.gif"
            alt="Perrito triste"
            className="mx-auto rounded-2xl mb-8"
          />
          <div className="inline-flex space-x-4 mx-auto">

            <Image
              width="170" height="380"
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWprd3cwcDAwMjk2a2Y0YWg3OHc0MTdncXhtdmk1NWNmczVwbThndyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ppSjX2iP9Ec1ExJRsV/giphy.gif"
              alt="Perrito triste"
              className="mx-auto rounded-2xl mb-8"
            />
            <Image
              width="170" height="380"
              src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2h3MWg4ejg1bjM0MzNkMzRtaThxb2U4NnA2NDlqNnF2YXo3Z3RqdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gXXFrjHFJIMoqKr8UT/giphy.gif"
              alt="Perrito triste"
              className="mx-auto rounded-2xl mb-8"
            />
          </div>
          <p className="text-lg text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-lora)' }}>
            Prometo no darte mucha pena ajena jaja ❤️
          </p>
        </CardBody>
      </Card>
    )
  }

  if (response === "no") {
    return (
      <Card className="max-w-lg mx-auto bg-content1/10 backdrop-blur-sm border border-rose-500/20 shadow-2xl rounded-2xl">
        <CardBody className="p-8 md:p-12 text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-rose-500 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            ¿Estás seguro/a?
          </h2>
          <Image
            width="170" height="380"
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTVqemg0dXB1c2FhNXh2MXpzdDBzMWg3Zzc3a3d5MXJuNDJvM3N5ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XgB1iZOFFkUXbOhNXt/giphy.gif"
            alt="Perrito triste"
            className="mx-auto rounded-2xl"
          />
          <p className="text-normal text-foreground-600 mb-6" style={{ fontFamily: 'var(--font-lora)' }}>
            Piénsalo de nuevo porfa... te pago :c
          </p>
          <Button
            onPress={() => setResponse(null)}
            className="bg-rose-500 hover:bg-rose-500/90  text-white"
          >
            Bueno, vamos de nuevo
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="max-w-lg mx-auto bg-content1/10 backdrop-blur-sm border border-rose-500/20 shadow-2xl rounded-2xl overflow-hidden">
      <CardBody className="p-8 md:p-12 overflow-hidden">
        {!isRevealed ? (
          <div className="text-center">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping" />
              <div className="relative w-full h-full bg-rose-500/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 text-rose-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              Tienes un mensaje especial...
            </h2>
            <Button
              onPress={() => setIsRevealed(true)}
              size="lg"
              className="bg-rose-500 hover:bg-rose-500/90 text-white px-8 py-6 text-lg"
            >
              Abrir mensaje
            </Button>
          </div>
        ) : (
          <div className="text-center animate-fadeIn">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              ¿Quieres ser mi San Valentín?
            </h2>
            <div className="w-20 h-0.5 bg-rose-500/40 mx-auto mb-6" />
            <p className="text-lg text-foreground text-left" style={{ fontFamily: 'var(--font-lora)' }}>
              Sin ti, mi vida sería como un taco sin salsa
            </p>
            <p className="text-lg text-foreground text-left" style={{ fontFamily: 'var(--font-lora)' }}>
              En ocaciones te miro y digo: "Wow, jicamas con chile ❤️"
            </p>
            <p className="text-muted-foreground italic my-8" style={{ fontFamily: 'var(--font-lora)' }}>
              "Te deseo más que a la Reforma Laboral de 40 horas ..."
            </p>
            <div ref={containerRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center min-h-[120px] relative">
              <Button
                onPress={() => setResponse("yes")}
                size="lg"
                className="bg-rose-500 hover:bg-rose-500/90 text-white px-8 py-6 text-lg z-10"
              >
                ¡Sí, a todo! 💖
              </Button>
              <Button
                ref={noButtonRef}
                onPress={() => setResponse("no")}
                onMouseEnter={handleNoButtonHover}
                variant="bordered"
                size="lg"
                className="border-rose-500/30 text-foreground hover:bg-rose-500/10 px-8 py-6 text-lg bg-transparent transition-transform duration-150 ease-out"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                }}
              >
                No, a la vuelta
              </Button>
            </div>
            <p className="text-small text-foreground-500">El botón "No" es algo nervioso</p>
          </div>
        )}
      </CardBody>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </Card>
  )
}
