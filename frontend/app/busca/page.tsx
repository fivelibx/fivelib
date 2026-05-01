"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getResources, Tool } from "../../services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Search, 
  Filter, 
  ExternalLink, 
  BookOpen,
  X
} from "lucide-react"

const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C#", "PHP", "Ruby"]

export default function BuscaPage() {
  const [libraries, setLibraries] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getResources()
        setLibraries(data)
      } catch (error) {
        console.error("Falha ao carregar bibliotecas:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    )
  }

  const clearFilters = () => {
    setSelectedLanguages([])
    setSearchQuery("")
  }

  const filteredLibraries = libraries.filter((lib) => {
    const matchesSearch =
      searchQuery === "" ||
      lib.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lib.descricao.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLanguage =
      selectedLanguages.length === 0 || selectedLanguages.includes(lib.linguagem)
    
    return matchesSearch && matchesLanguage
  })

  const hasActiveFilters = selectedLanguages.length > 0 || searchQuery !== ""

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando recursos...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-4 text-center text-3xl font-bold text-foreground">
                Buscar <span className="text-primary">Recursos</span>
              </h1>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome ou descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 border-border bg-secondary pl-10 text-foreground"
                  />
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`gap-2 border-border ${showFilters ? "border-primary text-primary" : ""}`}
                >
                  <Filter className="h-5 w-5" />
                  Filtros
                </Button>
              </div>
            </div>
          </div>
        </section>

        {showFilters && (
          <section className="border-b border-border bg-card/50 py-6">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium text-foreground">Linguagens</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <Button
                        key={lang}
                        variant={selectedLanguages.includes(lang) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleLanguage(lang)}
                      >
                        {lang}
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

        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{filteredLibraries.length}</span> resultados encontrados
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLibraries.map((lib) => (
                <Card key={lib.id} className="group border-border bg-card transition-all hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary">
                            {lib.nome}
                          </h3>
                          <p className="text-xs text-muted-foreground">{lib.linguagem}</p>
                        </div>
                      </div>
                    </div>
                    <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                      {lib.descricao}
                    </p>
                    <div className="flex items-center justify-end">
                      <Link href={lib.url_oficial} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="gap-1 text-primary hover:bg-primary/10">
                          Docs
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}