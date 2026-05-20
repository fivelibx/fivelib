"use client"

import * as React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ToolCard } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import MaintenanceBanner from "@/components/maintenance-banner"
import { useAuth } from "@/hooks/use-auth"
import { getResources, getMyFavoriteIds, Tool } from "@/services/api"
import { 
  Search, 
  BookMarked, 
  Users, 
  Zap, 
  ArrowRight, 
  Code2, 
  Database, 
  Palette, 
  Server,
  Smartphone,
  Shield
} from "lucide-react"

const baseCategories = [
  { name: "Frontend", icon: Palette, color: "bg-blue-500/10 text-blue-400" },
  { name: "Backend", icon: Server, color: "bg-green-500/10 text-green-400" },
  { name: "Database", icon: Database, color: "bg-purple-500/10 text-purple-400" },
  { name: "Mobile", icon: Smartphone, color: "bg-orange-500/10 text-orange-400" },
  { name: "DevOps", icon: Code2, color: "bg-red-500/10 text-red-400" },
  { name: "Segurança", icon: Shield, color: "bg-yellow-500/10 text-yellow-400" },
]

export default function HomePage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  
  const [popularTools, setPopularTools] = useState<Tool[]>([])
  const [favoritesIds, setFavoritesIds] = useState<number[]>([]) // 🛠️ Corrigido: Inicializador correto sem "=" dentro do tipo
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadHomeContent() {
      try {
        // 1. Busca todos os recursos
        const data = await getResources()
        
        // Ordena por estrelas e pega os 6 principais
        const sorted = [...data].sort((a, b) => (b.stars || 0) - (a.stars || 0)).slice(0, 6)
        setPopularTools(sorted)

        // 2. Agrupa a contagem exata vinda das categorias do backend
        const counts: Record<string, number> = {}
        data.forEach((tool) => {
          if (tool.categoria) {
            const key = tool.categoria.toLowerCase()
            counts[key] = (counts[key] || 0) + 1
          }
        })
        setCategoryCounts(counts)

        // 3. Sincroniza os IDs usando seu método nativo que já retorna a array pronta
        if (isLoggedIn) {
          const ids = await getMyFavoriteIds()
          setFavoritesIds(ids) // 🛠️ Corrigido: Evita o erro de .map() em tipo inadequado
        }
      } catch (error) {
        console.error("Erro na carga dinâmica da Home:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadHomeContent()
  }, [isLoggedIn])

  const handleAuthenticatedAction = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      e.stopPropagation()
      router.push("/login")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MaintenanceBanner />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Zap className="h-4 w-4" />
                <span>Plataforma para desenvolvedores</span>
              </div>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Todas as bibliotecas em um{" "}
                <span className="text-primary">único lugar</span>
              </h1>
              <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
                Encontre documentações oficiais, tutoriais e ferramentas de desenvolvimento. 
                Centralize seus recursos favoritos e acelere seu aprendizado.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/busca">
                  <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Search className="h-5 w-5" />
                    Explorar Bibliotecas
                  </Button>
                </Link>
                {!isLoggedIn && (
                  <Link href="/cadastro">
                    <Button size="lg" variant="outline" className="gap-2 border-border hover:border-primary hover:text-primary">
                      Criar Conta Grátis
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border bg-card transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Busca Inteligente</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Encontre bibliotecas e ferramentas por nome, linguagem ou categoria em segundos
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookMarked className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Biblioteca Pessoal</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Salve seus links favoritos e organize suas referências em um só lugar
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Comunidade Ativa</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Conecte-se com outros desenvolvedores e compartilhe experiências
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">Categorias</h2>
                <p className="text-muted-foreground">Explore por área de desenvolvimento</p>
              </div>
              <Link href="/busca">
                <Button variant="outline" className="hidden gap-2 border-border hover:border-primary hover:text-primary sm:flex">
                  Ver Todas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {baseCategories.map((category) => {
                const count = categoryCounts[category.name.toLowerCase()] || 0
                return (
                  <Link key={category.name} href={`/busca?categoria=${category.name.toLowerCase()}`}>
                    <Card className="group border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-primary">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {count} {count === 1 ? 'biblioteca' : 'bibliotecas'}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Libraries Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">Bibliotecas Populares</h2>
                <p className="text-muted-foreground">As mais acessadas pela comunidade diretamente do banco de dados</p>
              </div>
              <Link href="/busca">
                <Button variant="outline" className="hidden gap-2 border-border hover:border-primary hover:text-primary sm:flex">
                  Ver Mais
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-44 w-full rounded-lg bg-card border border-border/40 animate-pulse" />
                ))}
              </div>
            ) : (
              <div 
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                onClick={!isLoggedIn ? handleAuthenticatedAction : undefined}
              >
                {popularTools.map((tool) => (
                  <ToolCard 
                    key={tool.id} 
                    tool={tool} 
                    initialFavorite={favoritesIds.includes(tool.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {!isLoggedIn && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center md:p-16">
                <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                  Pronto para acelerar seu <span className="text-primary">aprendizado</span>?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                  Crie sua conta gratuitamente e tenha acesso a todas as funcionalidades.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/cadastro">
                    <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      Começar Agora
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}