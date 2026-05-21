"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { getResources, Tool, getMyFavoriteIds } from "../../services/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, ToolCard } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/use-auth"
import { 
  Search, 
  Filter, 
  X,
  Loader2 
} from "lucide-react"

const languages = ["JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "C#", "PHP", "Ruby"]
const categories = ["Frontend", "Backend", "Database", "Mobile", "DevOps", "Segurança"]

function BuscaContent() {
  const searchParams = useSearchParams()
  const categoriaParam = searchParams.get("categoria")

  const [libraries, setLibraries] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isLoggedIn } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set())

  // Sincroniza o parâmetro da URL se ele mudar ou for acionado pela Home
  useEffect(() => {
    if (categoriaParam) {
      setSelectedCategoria(categoriaParam.toLowerCase())
    } else {
      setSelectedCategoria(null)
    }
  }, [categoriaParam])

  useEffect(() => {
    setMounted(true)
    async function loadData() {
      try {
        const data = await getResources()
        setLibraries(data)
        if (isLoggedIn) {
          const ids = await getMyFavoriteIds()
          setFavoriteIds(new Set(ids))
        }
      } catch (error) {
        console.error("Falha ao carregar bibliotecas:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [isLoggedIn])

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    )
  }

  const clearFilters = () => {
    setSelectedLanguages([])
    setSearchQuery("")
    setSelectedCategoria(null)
  }

  // Lógica aplicando busca textual, filtro por linguagem E filtro por categoria do banco
  const filteredLibraries = libraries.filter((lib) => {
    const matchesSearch =
      searchQuery === "" ||
      lib.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lib.descricao.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLanguage =
      selectedLanguages.length === 0 || selectedLanguages.includes(lib.linguagem)

    const matchesCategoria = 
      !selectedCategoria || (lib.categoria && lib.categoria.toLowerCase() === selectedCategoria)
    
    return matchesSearch && matchesLanguage && matchesCategoria
  })

  const hasActiveFilters = selectedLanguages.length > 0 || searchQuery !== "" || selectedCategoria !== null

  if (!mounted || loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center space-y-4 p-6 text-center min-h-[50vh]">
        <div className="relative flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="absolute top-0 right-0 flex h-2 w-2 rounded-full bg-primary animate-ping" />
        </div>
        <div className="space-y-2 max-w-md">
          <h3 className="text-lg font-medium text-foreground animate-pulse">
            Despertando os servidores...
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O ecossistema FiveLib está inicializando as instâncias de documentação.
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 text-center text-3xl font-bold text-foreground">
              Buscar <span className="text-primary">Recursos</span>
            </h1>
            
            {selectedCategoria && (
              <div className="mb-4 flex justify-center">
                <Badge variant="secondary" className="gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 capitalize">
                  Categoria: {selectedCategoria}
                  <X 
                    size={12} 
                    className="cursor-pointer text-primary/70 hover:text-destructive transition-colors" 
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedCategoria(null)
                    }} 
                  />
                </Badge>
              </div>
            )}

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
                className={`gap-2 border-border ${showFilters ? "border-primary text-primary bg-primary/5" : ""}`}
              >
                <Filter className="h-5 w-5" />
                Filtros
              </Button>
            </div>

            {/* Painel de Filtros Integrado Visualmente */}
            {showFilters && (
              <div className="mt-3 rounded-lg border border-border bg-card p-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Seção de Categorias */}
                <div className="mb-5">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Categorias</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const isSelected = selectedCategoria === cat.toLowerCase()
                      return (
                        <Button
                          key={cat}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategoria(isSelected ? null : cat.toLowerCase())}
                        >
                          {cat}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Seção de Linguagens */}
                <div className="mb-5">
                  <h3 className="mb-3 text-sm font-medium text-muted-foreground">Linguagens</h3>
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

                {/* Ações de Limpeza */}
                {hasActiveFilters && (
                  <div className="flex justify-end border-t border-border pt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="gap-2 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                      Limpar filtros
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{filteredLibraries.length}</span> resultados encontrados
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLibraries.map((lib) => (
              <ToolCard
                key={lib.id}
                tool={lib}
                initialFavorite={favoriteIds.has(lib.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default function BuscaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Carregando ferramentas...</div>}>
        <BuscaContent />
      </Suspense>
      <Footer />
    </div>
  )
}