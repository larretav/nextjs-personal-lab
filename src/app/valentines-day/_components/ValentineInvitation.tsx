"use client"

import { useState, useRef, useCallback } from "react"
import { Button ,Card, CardBody } from "@heroui/react"

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
      <Card className="max-w-lg mx-auto bg-card/80 backdrop-blur-sm border-rose-500/20 shadow-2xl">
        <CardBody className="p-8 md:p-12 text-center">
          <div className="text-6xl md:text-8xl mb-6 animate-bounce">💖</div>
          <h2 className="text-3xl md:text-4xl font-bold text-rose-500 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            ¡Sabía que dirías que sí!
          </h2>
          <p className="text-lg text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-lora)' }}>
            Este será el mejor San Valentín de nuestras vidas. No puedo esperar para estar contigo.
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {["💕", "💗", "💖", "💝", "💘"].map((emoji, i) => (
              <span key={i} className="text-3xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                {emoji}
              </span>
            ))}
          </div>
        </CardBody>
      </Card>
    )
  }

  if (response === "no") {
    return (
      <Card className="max-w-lg mx-auto bg-card/80 backdrop-blur-sm border-rose-500/20 shadow-2xl">
        <CardBody className="p-8 md:p-12 text-center">
          <div className="text-6xl md:text-8xl mb-6">🥺</div>
          <h2 className="text-3xl md:text-4xl font-bold text-rose-500 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            ¿Estás seguro/a?
          </h2>
          <p className="text-lg text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-lora)' }}>
            Tal vez quieras pensarlo de nuevo...
          </p>
          <Button 
            onPress={() => setResponse(null)}
            className="bg-rose-500 hover:bg-rose-500/90 text-rose-500-foreground"
          >
            Déjame reconsiderarlo
          </Button>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="max-w-lg mx-auto bg-card/80 backdrop-blur-sm border-rose-500/20 shadow-2xl overflow-hidden">
      <CardBody className="p-8 md:p-12">
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
            <p className="text-muted-foreground mb-8" style={{ fontFamily: 'var(--font-lora)' }}>
              Alguien muy especial tiene algo que decirte
            </p>
            <Button 
              onClick={() => setIsRevealed(true)}
              size="lg"
              className="bg-rose-500 hover:bg-rose-500/90 text-rose-500-foreground px-8 py-6 text-lg"
            >
              Abrir mensaje
            </Button>
          </div>
        ) : (
          <div className="text-center animate-fadeIn">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              14 de Febrero
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              ¿Quieres pasar San Valentín conmigo?
            </h2>
            <div className="w-20 h-0.5 bg-rose-500/40 mx-auto mb-6" />
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-lora)' }}>
              Este día tan especial no sería lo mismo sin ti. Me encantaría compartir momentos únicos, risas y crear recuerdos inolvidables juntos.
            </p>
            <p className="text-muted-foreground italic mb-8" style={{ fontFamily: 'var(--font-lora)' }}>
              "Eres la razón por la que creo en el amor..."
            </p>
            <div ref={containerRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center min-h-[120px] relative">
              <Button 
                onClick={() => setResponse("yes")}
                size="lg"
                className="bg-rose-500 hover:bg-rose-500/90 text-rose-500-foreground px-8 py-6 text-lg z-10"
              >
                ¡Sí, acepto! 💖
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
                No
              </Button>
            </div>
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
