"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User, Mail, Shield, Link2, Star, Ticket, Edit3, Github, Linkedin, Eye, EyeOff, Activity, Globe, ArrowLeft } from "lucide-react"
import { getPerfilUsuario, getBibliotecaData, getAdminTickets, type UserProfile } from "@/services/api"

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState({ favoritos: 0, links: 0, tickets: 0 })
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  
  {/* Estados de Edição */}
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    titulo_profissional: "Desenvolvedor Backend | Python & FastAPI",
    github: "lucaspaiva-lp",
    linkedin: "lucas-paiva"
  })

  useEffect(() => {
    const carregarDadosCompletos = async () => {
      try {
        setLoading(true)
        setErro(null)
        
        const [dadosPerfil, dadosBiblioteca, dadosTickets] = await Promise.all([
          getPerfilUsuario(),
          getBibliotecaData().catch(() => ({ favoritos: [], links_privados: [] })),
          getAdminTickets().catch(() => [])
        ])

        const perfilNormalizado: UserProfile = {
          id: dadosPerfil.id,
          name: dadosPerfil.name || (dadosPerfil as any).nome || "Usuário",
          email: dadosPerfil.email,
          role: dadosPerfil.role || (dadosPerfil as any).perfil || "user"
        }

        setProfile(perfilNormalizado)
        setFormData(prev => ({
          ...prev,
          nome: perfilNormalizado.name,
          email: perfilNormalizado.email
        }))
        
        const chamadosDoUsuario = dadosTickets.filter((t: any) => t.usuario_id === dadosPerfil.id)

        setStats({
          favoritos: dadosBiblioteca.favoritos?.length || 0,
          links: dadosBiblioteca.links_privados?.length || 0,
          tickets: chamadosDoUsuario.length || 0
        })

      } catch (err: any) {
        console.error("Erro ao carregar dados do perfil:", err)
        if (err.message === "Sessão expirada") {
          window.location.href = "/login"
          return
        }
        setErro(err.message || "Falha ao conectar com o servidor.")
      } finally {
        setLoading(false)
      }
    }

    carregarDadosCompletos()
  }, [])

  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Menu Principal */}
      <Header />

      {/* Conteúdo Central */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Carregando painel de perfil...</p>
          </div>
        ) : erro ? (
          <div className="text-center py-12 border border-dashed border-destructive/40 rounded-lg text-destructive text-sm bg-destructive/5">
            {erro}
          </div>
        ) : profile ? (
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Coluna da Esquerda: Avatar Centralizado e Redes Sociais Visuais */}
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-md p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4 group">
                  <div className="w-full h-full rounded-full bg-primary/10 text-primary flex items-center justify-center border border-border">
                    <User className="h-12 w-12" />
                  </div>
                  {/* Instância futura para upload de imagem */}
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] text-white font-medium">Alterar</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground truncate max-w-full">{formData.nome}</h2>
                <p className="text-xs text-muted-foreground font-medium mt-1 px-2 line-clamp-2">
                  {formData.titulo_profissional}
                </p>

                {/* Bloco de Redes Sociais Lateral (Apenas Leitura/Links Rápidos) */}
                <div className="border-t border-border/60 w-full mt-6 pt-4 text-left">
                  <span className="text-xs font-semibold text-muted-foreground block mb-3">Conexões</span>
                  <div className="space-y-2">
                    {formData.github ? (
                      <a href={`https://github.com/${formData.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-border text-xs text-foreground transition-colors">
                        <Github className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate">github.com/{formData.github}</span>
                      </a>
                    ) : (
                      <div className="text-xs text-muted-foreground italic p-2 border border-dashed border-border rounded-lg">GitHub não configurado</div>
                    )}

                    {formData.linkedin ? (
                      <a href={`https://linkedin.com/in/${formData.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/60 border border-border text-xs text-foreground transition-colors">
                        <Linkedin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="truncate font-sans">linkedin.com/in/{formData.linkedin}</span>
                      </a>
                    ) : (
                      <div className="text-xs text-muted-foreground italic p-2 border border-dashed border-border rounded-lg">LinkedIn não configurado</div>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Coluna da Direita: Métricas e painel principal dinâmico */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Cards de Métricas Rápidas */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card border-border p-4 flex items-center gap-3 shadow-sm">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary hidden sm:block">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Favoritos</span>
                    <span className="text-xl font-bold text-foreground">{stats.favoritos}</span>
                  </div>
                </Card>

                <Card className="bg-card border-border p-4 flex items-center gap-3 shadow-sm">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary hidden sm:block">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Links</span>
                    <span className="text-xl font-bold text-foreground">{stats.links}</span>
                  </div>
                </Card>

                <Card className="bg-card border-border p-4 flex items-center gap-3 shadow-sm">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary hidden sm:block">
                    <Ticket className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Chamados</span>
                    <span className="text-xl font-bold text-foreground">{stats.tickets}</span>
                  </div>
                </Card>
              </div>

              {/* Bloco Condicional: Feed Principal VS Painel de Edição Completo */}
              {!isEditing ? (
                /* MODO PADRÃO: Feed de Atividades Recentes */
                <Card className="bg-card border-border shadow-md">
                  <CardHeader className="border-b border-border/60 pb-4 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg text-foreground">Atividades Recentes</CardTitle>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold bg-secondary hover:bg-secondary/80 border border-border text-foreground px-3 py-1.5 rounded-lg transition-colors">
                      <Edit3 className="h-3.5 w-3.5" />
                      Editar Perfil
                    </button>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Instância futura para o feed dinâmico */}
                    <div className="space-y-4">
                      <div className="flex gap-3 items-start border-l-2 border-primary/30 pl-4 relative pb-2">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary" />
                        <div>
                          <p className="text-sm text-foreground font-medium">Perfil configurado com sucesso</p>
                          <span className="text-xs text-muted-foreground block mt-0.5">Sua conta está integrada ao painel central do FiveLib.</span>
                        </div>
                      </div>
                      
                      <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border/60 rounded-lg bg-secondary/10">
                        Histórico completo de ações e modificações será listado aqui futuramente.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* MODO EDIÇÃO: Substitui o Feed temporariamente para o ajuste de dados */
                <Card className="bg-card border-border shadow-md">
                  <CardHeader className="border-b border-border/60 pb-4 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-lg text-foreground">Editar Informações do Perfil</CardTitle>
                    <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 text-xs font-semibold bg-secondary hover:bg-secondary/80 border border-border text-foreground px-3 py-1.5 rounded-lg transition-colors">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Voltar
                    </button>
                  </CardHeader>

                  <CardContent className="p-6">
                    <form onSubmit={handleSalvarPerfil} className="space-y-5">
                      
                      {/* Bloco 1: Identidade */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Nome Completo</label>
                          <input type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" required />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Endereço de E-mail</label>
                          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" required />
                        </div>
                      </div>

                      {/* Bloco 2: Linha de Título Personalizado */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-muted-foreground block">Título Profissional (Bio rápida)</label>
                        <input type="text" value={formData.titulo_professional} onChange={(e) => setFormData({ ...formData, titulo_professional: e.target.value })} placeholder="Ex: Desenvolvedor Backend | Python & FastAPI" className="w-full p-2.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
                      </div>

                      {/* Bloco 3: Redes Sociais */}
                      <div className="grid gap-4 sm:grid-cols-2 border-t border-border/40 pt-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Usuário do GitHub</label>
                          <div className="relative flex items-center">
                            <Github className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <input type="text" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="w-full p-2.5 pl-9 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">ID do LinkedIn (Slug da URL)</label>
                          <div className="relative flex items-center">
                            <Linkedin className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <input type="text" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full p-2.5 pl-9 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
                          </div>
                        </div>
                      </div>

                      {/* Bloco 4: Segurança */}
                      <div className="space-y-1 border-t border-border/40 pt-4">
                        <label className="text-xs font-medium text-muted-foreground block">Alterar Senha (deixe em branco para manter antiga)</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} value={formData.senha} onChange={(e) => setFormData({ ...formData, senha: e.target.value })} className="w-full p-2.5 pr-10 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Botões de Envio */}
                      <div className="pt-2 flex items-center gap-3 justify-end">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors">
                          Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors">
                          Salvar Alterações
                        </button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
            Não foi possível carregar as informações do perfil.
          </div>
        )}
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  )
}