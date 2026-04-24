"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Heart, 
  Link2, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Search,
  BookOpen,
  Star,
  FolderOpen
} from "lucide-react"

const mockFavorites = [
  {
    id: 1,
    name: "React",
    description: "Biblioteca JavaScript para construir interfaces de usuário",
    url: "https://react.dev",
    language: "JavaScript",
    category: "Frontend",
    addedAt: "2026-03-20",
  },
  {
    id: 2,
    name: "Next.js",
    description: "Framework React para produção",
    url: "https://nextjs.org",
    language: "JavaScript",
    category: "Frontend",
    addedAt: "2026-03-18",
  },
  {
    id: 3,
    name: "TailwindCSS",
    description: "Framework CSS utilitário",
    url: "https://tailwindcss.com",
    language: "CSS",
    category: "Frontend",
    addedAt: "2026-03-15",
  },
]

const mockPrivateLinks = [
  {
    id: 1,
    title: "Meu projeto pessoal",
    url: "https://github.com/meu-usuario/meu-projeto",
    description: "Repositório do meu projeto de estudos",
    addedAt: "2026-03-22",
  },
  {
    id: 2,
    title: "Curso de React",
    url: "https://plataforma.com/curso-react",
    description: "Link do curso que estou fazendo",
    addedAt: "2026-03-19",
  },
]

export default function DashboardPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [privateLinks, setPrivateLinks] = useState(mockPrivateLinks)
  const [searchQuery, setSearchQuery] = useState("")
  const [newLinkTitle, setNewLinkTitle] = useState("")
  const [newLinkUrl, setNewLinkUrl] = useState("")
  const [newLinkDescription, setNewLinkDescription] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id))
  }

  const removePrivateLink = (id: number) => {
    setPrivateLinks(privateLinks.filter((l) => l.id !== id))
  }

  const addPrivateLink = () => {
    if (newLinkTitle && newLinkUrl) {
      const newLink = {
        id: Date.now(),
        title: newLinkTitle,
        url: newLinkUrl,
        description: newLinkDescription,
        addedAt: new Date().toISOString().split("T")[0],
      }
      setPrivateLinks([newLink, ...privateLinks])
      setNewLinkTitle("")
      setNewLinkUrl("")
      setNewLinkDescription("")
      setIsDialogOpen(false)
    }
  }

  const filteredFavorites = favorites.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredPrivateLinks = privateLinks.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn userName="João Silva" />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Minha <span className="text-primary">Biblioteca</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus favoritos e links privados
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{favorites.length}</p>
                  <p className="text-sm text-muted-foreground">Favoritos</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Link2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{privateLinks.length}</p>
                  <p className="text-sm text-muted-foreground">Links Privados</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {favorites.length + privateLinks.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total de Items</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Add */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar na biblioteca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  Adicionar Link Privado
                </Button>
              </DialogTrigger>
              <DialogContent className="border-border bg-card">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Adicionar Link Privado</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Adicione uma URL externa à sua biblioteca pessoal. Este link só será visível para você.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-foreground">
                      Título
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ex: Meu Curso de Python"
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url" className="text-foreground">
                      URL
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://..."
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground">
                      Descrição (opcional)
                    </Label>
                    <Input
                      id="description"
                      placeholder="Uma breve descrição..."
                      value={newLinkDescription}
                      onChange={(e) => setNewLinkDescription(e.target.value)}
                      className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-border text-foreground"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={addPrivateLink}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={!newLinkTitle || !newLinkUrl}
                  >
                    Adicionar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="favorites" className="space-y-6">
            <TabsList className="border border-border bg-secondary">
              <TabsTrigger
                value="favorites"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Heart className="h-4 w-4" />
                Favoritos ({filteredFavorites.length})
              </TabsTrigger>
              <TabsTrigger
                value="private"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Link2 className="h-4 w-4" />
                Links Privados ({filteredPrivateLinks.length})
              </TabsTrigger>
            </TabsList>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              {filteredFavorites.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredFavorites.map((favorite) => (
                    <Card
                      key={favorite.id}
                      className="group border-border bg-card transition-all hover:border-primary/50"
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{favorite.name}</h3>
                              <p className="text-xs text-muted-foreground">{favorite.language}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFavorite(favorite.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remover</span>
                          </Button>
                        </div>
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {favorite.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="border-border text-xs text-muted-foreground"
                          >
                            {favorite.category}
                          </Badge>
                          <Link href={favorite.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-primary hover:bg-primary/10"
                            >
                              Abrir
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Adicionado em {new Date(favorite.addedAt).toLocaleDateString("pt-BR")}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-border bg-card">
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <Heart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-foreground">
                      Nenhum favorito encontrado
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Explore a busca e adicione bibliotecas aos seus favoritos
                    </p>
                    <Link href="/busca">
                      <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Search className="h-4 w-4" />
                        Explorar Bibliotecas
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Private Links Tab */}
            <TabsContent value="private">
              {filteredPrivateLinks.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPrivateLinks.map((link) => (
                    <Card
                      key={link.id}
                      className="group border-border bg-card transition-all hover:border-primary/50"
                    >
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                              <Link2 className="h-5 w-5 text-blue-500" />
                            </div>
                            <h3 className="font-semibold text-foreground">{link.title}</h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePrivateLink(link.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remover</span>
                          </Button>
                        </div>
                        {link.description && (
                          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            {new Date(link.addedAt).toLocaleDateString("pt-BR")}
                          </p>
                          <Link href={link.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1 text-primary hover:bg-primary/10"
                            >
                              Abrir
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-border bg-card">
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                      <Link2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-foreground">
                      Nenhum link privado
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Adicione URLs externas à sua biblioteca pessoal
                    </p>
                    <Button
                      onClick={() => setIsDialogOpen(true)}
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar Link
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
