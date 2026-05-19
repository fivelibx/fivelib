"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, User, Link2, Star, Ticket, Edit3, Github, Linkedin, Eye, EyeOff, Activity, ArrowLeft, Check, X, ShieldCheck, Mail } from "lucide-react"
import { getPerfilUsuario, getBibliotecaData, getAdminTickets, updatePerfilUsuario, type UserProfile } from "@/services/api"

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [stats, setStats] = useState({ favoritos: 0, links: 0, tickets: 0 })
  const [loading, setLoading] = useState(true)
  const [salvandoDados, setSalvandoDados] = useState(false)
  const [salvandoSeguranca, setSalvandoSeguranca] = useState(false)
  const [validandoCodigo, setValidandoCodigo] = useState(false) // 👈 Apenas controle de loading do token
  const [erro, setErro] = useState<string | null>(null)
  
  {/* Estado do Modal Customizado do FiveLib — Expandido para suportar o fluxo do token */}
  const [modalFeedback, setModalFeedback] = useState<{ 
    visivel: boolean; 
    mensagem: string; 
    isTokenFluxo?: boolean; 
    novoEmail?: string; 
    codigoDigitado?: string;
  }>({ 
    visivel: false, 
    mensagem: "", 
    isTokenFluxo: false, 
    novoEmail: "", 
    codigoDigitado: "" 
  })

  {/* Estados de Edição */}
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    titulo_professional: "",
    github: "",
    linkedin: ""
  })

  // Regras de validação expandidas para a senha
  const textSenha = formData.senha || ""
  const senhaPreenchida = textSenha.length > 0
  
  const senhaTemTamanhoMinimo = textSenha.length >= 8
  const senhaTemMaiuscula = /[A-Z]/.test(textSenha)
  const senhaTemMinuscula = /[a-z]/.test(textSenha)

  // O envio só é válido se o campo estiver vazio ou se cumprir TODOS os critérios obrigatórios
  const senhaValidaParaEnvio = !senhaPreenchida || (senhaTemTamanhoMinimo && senhaTemMaiuscula && senhaTemMinuscula)

  // Medidor de força integrado conforme padrão do cadastro
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "bg-border" }
    
    let points = 0
    if (password.length >= 8) points += 1
    if (/[A-Z]/.test(password)) points += 1
    if (/[a-z]/.test(password)) points += 1
    if (/[0-9]/.test(password)) points += 1

    switch (points) {
      case 1: return { score: 25, label: "Fraca", color: "bg-destructive" }
      case 2: return { score: 50, label: "Mediana", color: "bg-amber-500" }
      case 3: return { score: 75, label: "Boa", color: "bg-blue-500" }
      case 4: return { score: 100, label: "Forte", color: "bg-emerald-500" }
      default: return { score: 0, label: "Fraca", color: "bg-destructive" }
    }
  }

  const strength = getPasswordStrength(textSenha)

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
          email: perfilNormalizado.email,
          titulo_profissional: (dadosPerfil as any).titulo_profissional || prev.titulo_professional,
          github: (dadosPerfil as any).github || prev.github,
          linkedin: (dadosPerfil as any).linkedin || prev.linkedin
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

  {/* SUBMIT 1: Apenas Dados Cadastrais e Redes Sociais */}
  const handleSalvarDadosCadastrais = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSalvandoDados(true)
      setErro(null)

      const dadosAtualizados = await updatePerfilUsuario({
        nome: formData.nome,
        titulo_profissional: formData.titulo_professional,
        github: formData.github,
        linkedin: formData.linkedin,
        email: profile?.email || formData.email, // Mantém o e-mail atual do profile intacto
        senha: null // Garante que não mexe em senha neste bloco
      })

      setProfile(prev => prev ? { ...prev, name: dadosAtualizados.name } : null)
      setModalFeedback({ visivel: true, mensagem: dadosAtualizados.detail || "Informações de perfil salvas com sucesso!", isTokenFluxo: false })
      setIsEditing(false)
    } catch (err: any) {
      setErro(err.message || "Erro ao atualizar dados cadastrais.")
    } finally {
      setSalvandoDados(false)
    }
  }

  {/* SUBMIT 2: Modificações de Credenciais e Segurança */}
  const handleSalvarSeguranca = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!senhaValidaParaEnvio) return

    try {
      setSalvandoSeguranca(true)
      setErro(null)

      const dadosAtualizados = await updatePerfilUsuario({
        nome: formData.nome,
        titulo_profissional: formData.titulo_professional,
        github: formData.github,
        linkedin: formData.linkedin,
        email: formData.email, // Envia o novo e-mail para disparar o código se alterado
        senha: formData.senha.trim() !== "" ? formData.senha : null
      })

      // Se o email digitado for diferente do email atual do profile, o backend disparou o token!
      if (formData.email.toLowerCase() !== profile?.email.toLowerCase()) {
        setModalFeedback({
          visivel: true,
          mensagem: dadosAtualizados.detail || "Insira o token de verificação enviado para concluir a troca de e-mail.",
          isTokenFluxo: true,
          novoEmail: formData.email,
          codigoDigitado: ""
        })
      } else {
        setModalFeedback({ visivel: true, mensagem: dadosAtualizados.detail || "Alterações de segurança processadas!", isTokenFluxo: false })
        setFormData(prev => ({ ...prev, senha: "" }))
        setIsEditing(false)
      }
    } catch (err: any) {
      setErro(err.message || "Erro ao processar atualizações de segurança.")
    } finally {
      setSalvandoSeguranca(false)
    }
  }

  {/* SUBMIT INTERNAL MODAL: Validação do token de 6 dígitos direto na API */}
  const handleVerificarCodigoEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!modalFeedback.codigoDigitado || modalFeedback.codigoDigitado.length !== 6) return

    try {
      setValidandoCodigo(true)
      setErro(null)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/auth/verify-new-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: modalFeedback.novoEmail,
          code: modalFeedback.codigoDigitado
        })
      })

      const resultado = await response.json()

      if (!response.ok) {
        throw new Error(resultado.detail || "Código de verificação incorreto ou expirado.")
      }

      // Atualiza o estado global do profile para refletir o e-mail validado
      setProfile(prev => prev ? { ...prev, email: modalFeedback.novoEmail || prev.email } : null)
      setModalFeedback({ visivel: true, mensagem: resultado.message || "E-mail validado e atualizado com sucesso!", isTokenFluxo: false })
      setIsEditing(false)

    } catch (err: any) {
      setErro(err.message || "Falha ao validar token.")
      setModalFeedback(prev => ({ ...prev, codigoDigitado: "" }))
    } finally {
      setValidandoCodigo(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

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
            
            {/* Coluna da Esquerda: Avatar e Conexões */}
            <div className="space-y-6">
              <Card className="bg-card border-border shadow-md p-6 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4 group">
                  <div className="w-full h-full rounded-full bg-primary/10 text-primary flex items-center justify-center border border-border">
                    <User className="h-12 w-12" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] text-white font-medium">Alterar</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground truncate max-w-full">{formData.nome}</h2>
                
                <p className="text-xs text-primary/90 font-medium mt-2 pt-2 border-t border-border/40 w-full max-w-[85%] line-clamp-2 tracking-wide leading-relaxed">
                  {formData.titulo_professional}
                </p>

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

            {/* Coluna da Direita: Métricas e Formulários */}
            <div className="md:col-span-2 space-y-6">
              
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-card border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                    <Star className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Favoritos</span>
                  <span className="text-3xl font-extrabold text-foreground mt-1">{stats.favoritos}</span>
                </Card>

                <Card className="bg-card border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Links</span>
                  <span className="text-3xl font-extrabold text-foreground mt-1">{stats.links}</span>
                </Card>

                <Card className="bg-card border-border p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mb-2">
                    <Ticket className="h-4 w-4" />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider block">Chamados</span>
                  <span className="text-3xl font-extrabold text-foreground mt-1">{stats.tickets}</span>
                </Card>
              </div>

              {!isEditing ? (
                <Card className="bg-card border-border shadow-md">
                  <CardHeader className="border-b border-border/60 pb-4 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg text-foreground">Atividades Recentes (Em manutenção)</CardTitle>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold bg-secondary hover:bg-secondary/80 border border-border text-foreground px-3 py-1.5 rounded-lg transition-colors">
                      <Edit3 className="h-3.5 w-3.5" />
                      Editar Perfil
                    </button>
                  </CardHeader>
                  <CardContent className="p-6">
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
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  {/* Botão Global de Voltar Superior */}
                  <div className="flex justify-end">
                    <button type="button" onClick={() => setIsEditing(false)} className="flex items-center gap-1 text-xs font-semibold bg-secondary hover:bg-secondary/80 border border-border text-foreground px-3 py-1.5 rounded-lg transition-colors">
                      <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao Painel
                    </button>
                  </div>

                  {/* BLOCO DE FORMULÁRIO 1: Informações de Perfil e Sociais */}
                  <Card className="bg-card border-border shadow-md">
                    <CardHeader className="border-b border-border/40 pb-3">
                      <CardTitle className="text-sm font-bold text-primary uppercase tracking-wider">Dados Cadastrais e Conexões</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <form onSubmit={handleSalvarDadosCadastrais} className="space-y-5">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Nome Completo</label>
                          <input type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" required disabled={salvandoDados} />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Título Profissional (Bio rápida)</label>
                          <input type="text" value={formData.titulo_professional} onChange={(e) => setFormData({ ...formData, titulo_professional: e.target.value })} placeholder="Ex: Desenvolvedor Backend | Python & FastAPI" className="w-full p-2.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" disabled={salvandoDados} />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground block">Usuário do GitHub</label>
                            <div className="relative flex items-center">
                              <Github className="absolute left-3 h-4 w-4 text-muted-foreground" />
                              <input type="text" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} placeholder="Ex: lucaspaiva-lp" className="w-full p-2.5 pl-9 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" disabled={salvandoDados} />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground block">ID do LinkedIn (Slug da URL)</label>
                            <div className="relative flex items-center">
                              <Linkedin className="absolute left-3 h-4 w-4 text-muted-foreground" />
                              <input type="text" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} placeholder="Ex: lucaspaiva-lp" className="w-full p-2.5 pl-9 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" disabled={salvandoDados} />
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button type="submit" disabled={salvandoDados} className="px-4 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2">
                            {salvandoDados && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            {salvandoDados ? "Atualizando..." : "Salvar Dados Cadastrais"}
                          </button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  {/* BLOCO DE FORMULÁRIO 2: Segurança (E-mail e Senha) */}
                  <Card className="bg-card border-border shadow-md">
                    <CardHeader className="border-b border-border/40 pb-3">
                      <CardTitle className="text-sm font-bold text-destructive/90 uppercase tracking-wider">Credenciais e Autenticação</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <form onSubmit={handleSalvarSeguranca} className="space-y-5">
                        
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Alterar Endereço de E-mail</label>
                          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" required disabled={salvandoSeguranca} />
                          <span className="text-[10px] text-muted-foreground block mt-1">Nota: Caso altere, um código de ativação de 6 dígitos será despachado para a nova caixa.</span>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground block">Modificar Senha de Acesso</label>
                          <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={formData.senha} onChange={(e) => setFormData({ ...formData, senha: e.target.value })} placeholder="Digite a nova senha para alterar" className="w-full p-2.5 pr-10 rounded-lg bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary" disabled={salvandoSeguranca} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground" disabled={salvandoSeguranca}>
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>

                          {/* Medidor estruturado de força e múltiplos critérios */}
                          {senhaPreenchida && (
                            <div className="mt-2 p-2.5 rounded-lg border bg-secondary/20 border-border/50 space-y-2.5 transition-all">
                              
                              {/* Barra de Progresso reativa */}
                              <div className="space-y-1">
                                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-wide">
                                  <span>Força da Senha</span>
                                  <span className="font-sans font-extrabold">{strength.label}</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-300 ${strength.color}`} 
                                    style={{ width: `${strength.score}%` }}
                                  />
                                </div>
                              </div>

                              <span className="text-[10px] font-bold text-muted-foreground block uppercase tracking-wider pt-1 border-t border-border/30">Critérios obrigatórios:</span>
                              
                              <div className="grid gap-1.5 sm:grid-cols-3">
                                <div className="flex items-center gap-1.5 text-xs">
                                  {senhaTemTamanhoMinimo ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                  ) : (
                                    <X className="h-3.5 w-3.5 text-destructive shrink-0" />
                                  )}
                                  <span className={senhaTemTamanhoMinimo ? "text-emerald-500 font-medium" : "text-muted-foreground text-[11px]"}>
                                    Pelo menos 8 carac.
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs">
                                  {senhaTemMaiuscula ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                  ) : (
                                    <X className="h-3.5 w-3.5 text-destructive shrink-0" />
                                  )}
                                  <span className={senhaTemMaiuscula ? "text-emerald-500 font-medium" : "text-muted-foreground text-[11px]"}>
                                    Letra Maiúscula
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 text-xs">
                                  {senhaTemMinuscula ? (
                                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                  ) : (
                                    <X className="h-3.5 w-3.5 text-destructive shrink-0" />
                                  )}
                                  <span className={senhaTemMinuscula ? "text-emerald-500 font-medium" : "text-muted-foreground text-[11px]"}>
                                    Letra Minúscula
                                  </span>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button type="submit" disabled={salvandoSeguranca || !senhaValidaParaEnvio} className="px-4 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                            {salvandoSeguranca && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                            {salvandoSeguranca ? "Processando..." : "Atualizar Segurança"}
                          </button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                </div>
              )}

            </div>
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg text-muted-foreground text-sm">
            Não foi possível carregar as informações do perfil.
          </div>
        )}
      </main>

      {/* MODAL DE CONCLUÍDO TOTALMENTE ANIMADO E INTEGRADO À IDENTIDADE */}
      {modalFeedback.visivel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 bg-card border border-border rounded-xl shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300">
            
            {/* Renderização Condicional Inteligente do Miolo do Modal */}
            {modalFeedback.isTokenFluxo ? (
              <form onSubmit={handleVerificarCodigoEmail} className="w-full flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-inner">
                  <Mail className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1">Verificação de Segurança</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed px-2">
                    {modalFeedback.mensagem}
                  </p>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="000000"
                  value={modalFeedback.codigoDigitado || ""}
                  onChange={(e) => setModalFeedback({ ...modalFeedback, codigoDigitado: e.target.value.replace(/\D/g, "") })}
                  className="w-full p-3 bg-background border border-border rounded-lg text-center font-mono text-xl tracking-[0.4em] text-foreground focus:outline-none focus:border-primary"
                  disabled={validandoCodigo}
                />

                <div className="flex gap-2 w-full pt-2">
                  <button 
                    type="button" 
                    onClick={() => setModalFeedback({ visivel: false, message: "" } as any)}
                    className="flex-1 py-2 text-xs font-semibold bg-secondary text-foreground rounded-lg hover:bg-secondary/80"
                    disabled={validandoCodigo}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-1.5"
                    disabled={validandoCodigo || modalFeedback.codigoDigitado?.length !== 6}
                  >
                    {validandoCodigo && <Loader2 className="h-3 w-3 animate-spin" />}
                    Validar Token
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20 shadow-inner animate-bounce">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">Operação Concluída</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 px-2">
                  {modalFeedback.mensagem}
                </p>
                <button 
                  onClick={() => setModalFeedback({ visivel: false, mensagem: "", isTokenFluxo: false })}
                  className="w-full py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all active:scale-98 shadow-md"
                >
                  Entendido
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}