"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  getBibliotecaData, 
  criarLinkPrivado, 
  deletarLinkPrivado, 
  removerFerramentaFavorita,
  type Tool,
  type PrivateLink
} from "@/services/api"
import { 
  Plus, 
  Star, 
  Link2, 
  Trash2, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  FolderPlus,
  X,
  Folder,
  Search
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"favoritos" | "privados">("favoritos")
  const [favoritos, setFavoritos] = useState<Tool[]>([])
  const [linksPrivados, setLinksPrivados] = useState<PrivateLink[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [titulo, setTitulo] = useState("")
  const [url, setUrl] = useState("")
  const [descricao, setDescricao] = useState("")

  const carregarBiblioteca = async () => {
    try {
      setLoading(true)
      const data = await getBibliotecaData()
      setFavoritos(data.favoritos || [])
      setLinksPrivados(data.links_privados || [])
    } catch (err: any) {
      console.error(err)
      if (err.message.includes("Sessão expirada")) {
        window.location.href = "/login"
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarBiblioteca()
  }, [])

  const handleCriarLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo.trim() || !url.trim()) {
      setErrorMessage("Título e URL são obrigatórios.")
      return
    }

    try {
      setSubmitLoading(true)
      setErrorMessage(null)
      
      const novoLink = await criarLinkPrivado({
        titulo,
        url,
        descricao: descricao.trim() || undefined
      })

      setLinksPrivados((prev) => [novoLink, ...prev])
      setTitulo("")
      setUrl("")
      setDescricao("")
      setModalOpen(false)
    } catch (err: any) {
      setErrorMessage(err.message)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDeletarLink = async (id: number) => {
    if (!confirm("Deseja remover este link privado?")) return
    try {
      await deletarLinkPrivado(id)
      setLinksPrivados((prev) => prev.filter(item => item.id !== id))
    } catch (err) {
      alert("Não foi possível remover o link privado.")
    }
  }

  const handleDesfavoritar = async (toolId: number) => {
    try {
      await removerFerramentaFavorita(toolId)
      setFavoritos((prev) => prev.filter(item => item.id !== toolId))
    } catch (err) {
      alert("Não foi possível remover dos favoritos.")
    }
  }

  const favoritosFiltrados = favoritos.filter(item =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const privadosFiltrados = linksPrivados.filter(item =>
    item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.descricao && item.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Minha <span className="text-primary">Biblioteca</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gerencie seus favoritos e links privados
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{favoritos.length}</p>
                <p className="text-xs text-muted-foreground">Favoritos</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Link2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{linksPrivados.length}</p>
                <p className="text-xs text-muted-foreground">Links Privados</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-muted text-muted-foreground">
                <Folder className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{favoritos.length + linksPrivados.length}</p>
                <p className="text-xs text-muted-foreground">Total de Itens</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar na biblioteca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-card border-border text-sm"
            />
          </div>

          <Button onClick={() => setModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-medium self-end md:self-auto">
            <Plus className="h-4 w-4" />
            Adicionar Link Privado
          </Button>
        </div>

        <div className="flex gap-2 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("favoritos")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
              activeTab === "favoritos"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className="h-4 w-4" />
            Favoritos ({favoritosFiltrados.length})
          </button>
          <button
            onClick={() => setActiveTab("privados")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
              activeTab === "privados"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Link2 className="h-4 w-4" />
            Links Privados ({privadosFiltrados.length})
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Sincronizando biblioteca...</p>
          </div>
        ) : activeTab === "favoritos" ? (
          favoritosFiltrados.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
              Nenhuma ferramenta encontrada nos favoritos.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {favoritosFiltrados.map((tool) => (
                <Card key={tool.id} className="border-border bg-card flex flex-col justify-between">
                  <CardContent className="p-5 flex flex-col h-full justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground tracking-tight">{tool.nome}</h3>
                          <p className="text-xs text-primary font-medium mt-0.5">{tool.linguagem}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDesfavoritar(tool.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                        {tool.descricao}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/60">
                      <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                        Global
                      </span>
                      <a href={tool.url_oficial} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                        Abrir <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        ) : (
          privadosFiltrados.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
              Nenhum link privado armazenado.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {privadosFiltrados.map((link) => (
                <Card key={link.id} className="border-border bg-card flex flex-col justify-between">
                  <CardContent className="p-5 flex flex-col h-full justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground tracking-tight line-clamp-1">{link.titulo}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeletarLink(link.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {link.descricao && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">{link.descricao}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/60">
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1 max-w-[180px]">
                        <Link2 className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{link.url}</span>
                      </div>
                      <a href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                        Abrir <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        )}

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md border border-border bg-card rounded-lg shadow-lg p-6 m-4 relative">
              <button onClick={() => setModalOpen(false)} className="absolute right-4 top-4 opacity-70 hover:opacity-100">
                <X className="h-4 w-4 text-foreground" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <FolderPlus className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Adicionar Link Privado</h2>
              </div>

              <form onSubmit={handleCriarLink} className="space-y-4">
                {errorMessage && (
                  <div className="flex items-center gap-2 p-3 text-xs rounded bg-destructive/10 text-destructive border border-destructive/20">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Título</label>
                  <Input
                    placeholder="Ex: Documentação Avançada de Infra"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">URL</label>
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-secondary border-border"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Descrição (opcional)</label>
                  <Textarea
                    placeholder="Uma breve descrição..."
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    rows={3}
                    className="bg-secondary border-border resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={submitLoading}>
                    {submitLoading ? "Salvando..." : "Adicionar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}