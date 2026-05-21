"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ChevronRight, ChevronLeft, BookOpen, Search, Star, Library, HeadphonesIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TourSlide {
  icon: React.ReactNode
  title: string
  highlight: string
  description: string
  tip?: string
}

const slides: TourSlide[] = [
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "Bem-vindo ao",
    highlight: "FiveLib",
    description: "Seu guia centralizado de bibliotecas, frameworks e documentações técnicas. Encontre tudo que você precisa para acelerar seu aprendizado e desenvolvimento.",
    tip: "Este tour vai te mostrar as principais funcionalidades em menos de 1 minuto.",
  },
  {
    icon: <Search className="h-10 w-10" />,
    title: "Buscar",
    highlight: "Recursos",
    description: "Pesquise por nome ou descrição entre todas as ferramentas cadastradas. Use os filtros de Categoria e Linguagem para encontrar exatamente o que precisa.",
    tip: "Dica: você pode buscar por 'Python', 'Frontend' ou diretamente pelo nome da biblioteca.",
  },
  {
    icon: <Star className="h-10 w-10" />,
    title: "Favorite e",
    highlight: "Avalie",
    description: "Clique no coração para salvar uma ferramenta nos seus favoritos. Clique na estrela para dar um ponto de relevância e ajudar a comunidade a descobrir as melhores ferramentas.",
    tip: "Suas ferramentas favoritadas ficam salvas na sua Biblioteca pessoal.",
  },
  {
    icon: <Library className="h-10 w-10" />,
    title: "Minha",
    highlight: "Biblioteca",
    description: "Acesse seus favoritos e links privados em um só lugar. Adicione links externos que não estão no FiveLib e organize tudo do seu jeito.",
    tip: "Links privados são visíveis somente para você.",
  },
  {
    icon: <HeadphonesIcon className="h-10 w-10" />,
    title: "Central de",
    highlight: "Suporte",
    description: "Encontrou um link quebrado? Tem uma sugestão? Abra um chamado. Nossa equipe responde em até 48–72 hours. Você pode acompanhar o status dos seus chamados no perfil.",
    tip: "Acesse 'Meus Chamados' no menu do seu perfil para acompanhar as respostas.",
  },
  {
    icon: <User className="h-10 w-10" />,
    title: "Seu",
    highlight: "Perfil",
    description: "Personalize seu título profissional, adicione seus links do GitHub e LinkedIn. Acompanhe seus favoritos, links privados e chamados abertos em um painel unificado.",
    tip: "Clique no seu nome no canto superior direito para acessar o menu do perfil.",
  },
]

export default function Tour() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"next" | "prev">("next")
  
  const pathname = usePathname()

  useEffect(() => {
    const checkTour = () => {
      const shouldShow = localStorage.getItem("fivelib_show_tour");
      const alreadySeen = localStorage.getItem("fivelib_tour_seen");
      const token = localStorage.getItem("access_token");

      if (pathname !== "/login" && pathname !== "/cadastro") {
        if (shouldShow === "true" && !alreadySeen) {
          if (token) {
            setVisible(true);
          } else {
            localStorage.removeItem("fivelib_show_tour");
          }
        }
      }
    };

    checkTour();

    window.addEventListener("storage", checkTour);
    return () => window.removeEventListener("storage", checkTour);
  }, [pathname]);

  useEffect(() => {
    if (visible) {
      localStorage.removeItem("fivelib_show_tour");
    }
  }, [visible]);

  const finishTour = () => {
    localStorage.setItem("fivelib_tour_seen", "true")
    setVisible(false)
  }

  const skipTour = () => {
    localStorage.setItem("fivelib_tour_seen", "true")
    setVisible(false)
  }

  const goTo = (index: number, dir: "next" | "prev") => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 200)
  }

  const next = () => {
    if (current < slides.length - 1) goTo(current + 1, "next")
  }

  const prev = () => {
    if (current > 0) goTo(current - 1, "prev")
  }

  if (!visible) return null

  const slide = slides[current]
  const isLast = current === slides.length - 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">

        <div className="flex gap-1 p-4 pb-0">
          {slides.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i <= current ? "hsl(var(--primary))" : "hsl(var(--border))",
              }}
            />
          ))}
        </div>

        <div
          className="px-8 pt-8 pb-6 transition-all duration-200"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "next"
                ? "translateX(20px)"
                : "translateX(-20px)"
              : "translateX(0)",
          }}
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {slide.icon}
          </div>

          <h2 className="mb-3 text-2xl font-bold text-foreground">
            {slide.title}{" "}
            <span className="text-primary">{slide.highlight}</span>
          </h2>

          <p className="mb-4 text-base leading-relaxed text-muted-foreground">
            {slide.description}
          </p>

          {slide.tip && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="text-sm text-primary/80">
                <span className="font-semibold text-primary">💡 </span>
                {slide.tip}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-border px-8 py-5">
          <div className="flex items-center justify-between">

            <button
              onClick={skipTour}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              Pular tour
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground mr-2">
                {current + 1} de {slides.length}
              </span>

              {current > 0 && (
                <Button variant="outline" size="sm" onClick={prev} className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
              )}

              {isLast ? (
                <Button
                  size="sm"
                  onClick={finishTour}
                  className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Começar a usar
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={next}
                  className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Próximo
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}