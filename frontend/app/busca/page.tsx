"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink, 
  Heart, 
  BookOpen,
  X
} from "lucide-react"

const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C#", "PHP", "Ruby"]
const categories = ["Frontend", "Backend", "Database", "Mobile", "DevOps", "Segurança", "AI/ML", "Testing"]

const mockLibraries = [
  {
    id: 1,
    name: "React",
    description: "Biblioteca JavaScript para construir interfaces de usuário interativas e componentizadas.",
    language: "JavaScript",
    category: "Frontend",
    stars: "220k",
    url: "https://react.dev",
    tags: ["UI", "Components", "SPA"],
  },
  {
    id: 2,
    name: "Next.js",
    description: "Framework React para produção com renderização híbrida, rotas API e otimizações automáticas.",
    language: "JavaScript",
    category: "Frontend",
    stars: "120k",
    url: "https://nextjs.org",
    tags: ["SSR", "SSG", "Full-stack"],
  },
  {
    id: 3,
    name: "TailwindCSS",
    description: "Framework CSS utilitário para criar designs customizados rapidamente sem sair do HTML.",
    language: "CSS",
    category: "Frontend",
    stars: "80k",
    url: "https://tailwindcss.com",
    tags: ["CSS", "Utility", "Design"],
  },
  {
    id: 4,
    name: "Express.js",
    description: "Framework web minimalista e flexível para Node.js com recursos robustos para APIs.",
    language: "JavaScript",
    category: "Backend",
    stars: "63k",
    url: "https://expressjs.com",
    tags: ["API", "REST", "Middleware"],
  },
  {
    id: 5,
    name: "PostgreSQL",
    description: "Sistema de banco de dados relacional avançado, open source e altamente extensível.",
    language: "SQL",
    category: "Database",
    stars: "15k",
    url: "https://postgresql.org",
    tags: ["SQL", "ACID", "Relational"],
  },
  {
    id: 6,
    name: "Docker",
    description: "Plataforma para desenvolver, enviar e executar aplicações em containers isolados.",
    language: "DevOps",
    category: "DevOps",
    stars: "70k",
    url: "https://docker.com",
    tags: ["Container", "Deploy", "Infra"],
  },
  {
    id: 7,
    name: "Vue.js",
    description: "Framework progressivo para construir interfaces de usuário com reatividade simplificada.",
    language: "JavaScript",
    category: "Frontend",
    stars: "45k",
    url: "https://vuejs.org",
    tags: ["UI", "Reactive", "SPA"],
  },
  {
    id: 8,
    name: "FastAPI",
    description: "Framework Python moderno e rápido para criar APIs com tipagem automática e documentação.",
    language: "Python",
    category: "Backend",
    stars: "70k",
    url: "https://fastapi.tiangolo.com",
    tags: ["API", "Async", "OpenAPI"],
  },
  {
    id: 9,
    name: "Prisma",
    description: "ORM de próxima geração para Node.js e TypeScript com type-safety e migrations.",
    language: "TypeScript",
    category: "Database",
    stars: "35k",
    url: "https://prisma.io",
    tags: ["ORM", "Database", "TypeSafe"],
  },
]

export default function BuscaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    )
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSelectedLanguages([])
    setSelectedCategories([])
    setSearchQuery("")
  }

  const filteredLibraries = mockLibraries.filter((lib) => {
    const matchesSearch =
      searchQuery === "" ||
      lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lib.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLanguage =
      selectedLanguages.length === 0 || selectedLanguages.includes(lib.language)
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(lib.category)
    return matchesSearch && matchesLanguage && matchesCategory
  })

  const hasActiveFilters = selectedLanguages.length > 0 || selectedCategories.length > 0 || searchQuery !== ""

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-4 text-center text-3xl font-bold text-foreground">
                Buscar <span className="text-primary">Bibliotecas</span>
              </h1>
              <p className="mb-6 text-center text-muted-foreground">
                Encontre documentações, frameworks e ferramentas por nome, linguagem ou categoria
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome ou descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
                  />
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`gap-2 border-border ${showFilters ? "border-primary text-primary" : "text-foreground hover:border-primary hover:text-primary"}`}
                >
                  <Filter className="h-5 w-5" />
                  Filtros
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        {showFilters && (
          <section className="border-b border-border bg-card/50 py-6">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl space-y-6">
                {/* Languages */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-foreground">Linguagens</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang}
                        variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleLanguage(lang)}
                        className={
                          selectedLanguages.includes(lang)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-foreground">Categorias</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategories.includes(cat) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(cat)}
                        className={
                          selectedCategories.includes(cat)
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{filteredLibraries.length}</span> resultados encontrados
              </p>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {selectedLanguages.map((lang) => (
                    <Badge
                      key={lang}
                      variant="secondary"
                      className="cursor-pointer gap-1 bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={() => toggleLanguage(lang)}
                    >
                      {lang}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                  {selectedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="cursor-pointer gap-1 bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={() => toggleCategory(cat)}
                    >
                      {cat}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Library Grid */}
            {filteredLibraries.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredLibraries.map((lib) => (
                  <Card
                    key={lib.id}
                    className="group border-border bg-card transition-all hover:border-primary/50"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary">
                              {lib.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{lib.language}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(lib.id)}
                          className={favorites.includes(lib.id) ? "text-red-500" : "text-muted-foreground hover:text-red-500"}
                        >
                          <Heart
                            className={`h-5 w-5 ${favorites.includes(lib.id) ? "fill-current" : ""}`}
                          />
                          <span className="sr-only">Favoritar</span>
                        </Button>
                      </div>
                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {lib.description}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-1">
                        {lib.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-secondary text-xs text-muted-foreground"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{lib.stars}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant="outline"
                            className="border-border text-xs text-muted-foreground"
                          >
                            {lib.category}
                          </Badge>
                          <Link href={lib.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-primary hover:bg-primary/10"
                            >
                              Docs
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-foreground">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente ajustar seus filtros ou buscar por outro termo
                </p>
                <Button
                  variant="outline"
                  className="mt-4 border-border hover:border-primary hover:text-primary"
                  onClick={clearFilters}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
