"use client"

import { useState, useEffect, useCallback } from "react"
import { ToolPreview } from "@/components/tool-preview"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Save, Loader2, AlertCircle, CheckCircle2, RefreshCw, ExternalLink, Trash2 } from "lucide-react"

interface Ferramenta {
  id: string | number
  nome: string
  descricao: string
  url_oficial: string
  linguagem: string
  stars: number
  tags: string[]
}

export default function GestaoFerramentas() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    url_oficial: "",
    linguagem: "",
    stars: 0,
    tags: [] as string[]
  })

  const [ferramentas, setFerramentas] = useState<Ferramenta[]>([])
  const [userRole, setUserRole] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingList, setLoadingList] = useState(true)
  const [deletingId, setDeletingId] = useState<string | number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState(false)

  const carregarFerramentas = useCallback(async () => {
    try {
      setLoadingList(true)
      const token = localStorage.getItem("access_token")
      const role = localStorage.getItem("user_role")
      setUserRole(role)

      const res = await fetch("http://localhost:8001/api/v1/resources/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (res.ok) {
        const dados = await res.json()
        setFerramentas(dados)
      }
    } catch (err) {
      console.error("Erro ao buscar catálogo de ferramentas:", err)
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => {
    carregarFerramentas()
  }, [carregarFerramentas])

  const handleSalvar = async () => {
    if (!formData.nome || !formData.descricao || !formData.url_oficial) {
      setError("Por favor, preencha os campos obrigatórios (Nome, Descrição e URL).")
      return
    }

    let urlTratada = formData.url_oficial.trim()
    if (!/^https?:\/\//i.test(urlTratada)) {
      urlTratada = `https://${urlTratada}`
    }

    const payloadCompleto = {
      nome: formData.nome,
      descricao: formData.descricao,
      url_oficial: urlTratada,
      linguagem: formData.linguagem || "Não especificada",
      status_ativo: true,
      stars: formData.stars,
      tags: formData.tags,
      categoria: "Ferramentas",
      icon_slug: null
    }

    try {
      setLoading(true)
      setError(null)
      setSucesso(false)

      const token = localStorage.getItem("access_token")
      
      const res = await fetch("http://localhost:8001/api/v1/resources/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payloadCompleto)
      })
      
      if (!res.ok) {
        if (res.status === 422) {
          const erroDetalhado = await res.json()
          console.error("Detalhes do erro 422 do FastAPI:", erroDetalhado)
          throw new Error("Erro 422: Campos incompatíveis com o ToolSchema. Verifique o console.")
        }
        if (res.status === 403) {
          throw new Error("Acesso negado: privilégios insuficientes para cadastrar ferramentas.")
        }
        throw new Error("Erro ao salvar ferramenta. Verifique os dados inseridos.")
      }

      setSucesso(true)
      setFormData({ nome: "", descricao: "", url_oficial: "", linguagem: "", stars: 0, tags: [] })
      
      carregarFerramentas()
    } catch (err: any) {
      setError(err.message || "Erro de conexão com o servidor.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeletar = async (resourceId: string | number) => {
    console.log("-> Função handleDeletar acionada no Front com ID:", resourceId)

    try {
      setDeletingId(resourceId)

      const token = localStorage.getItem("access_token")
      const idNumerico = Number(resourceId)
      
      console.log(`-> Enviando requisição DELETE para: http://localhost:8001/api/v1/resources/${idNumerico}`)

      const res = await fetch(`http://localhost:8001/api/v1/resources/${idNumerico}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      console.log("-> Status retornado pelo backend:", res.status)

      if (!res.ok) {
        const erroDados = await res.json()
        throw new Error(erroDados.detail || "Erro ao deletar ferramenta.")
      }

      alert("Ferramenta removida com sucesso!")
      carregarFerramentas() 

    } catch (err: any) {
      console.error("❌ Erro capturado na exclusão:", err)
      alert(err.message || "Erro ao tentar conectar com o servidor.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-12">
      {/* Seção do Formulário de Cadastro */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cadastrar Nova Ferramenta</h1>
            <p className="text-sm text-muted-foreground">Adicione documentações e utilitários ao catálogo geral.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="mr-2 h-4 w-4" /> {showPreview ? "Ocultar Preview" : "Mostrar Preview"}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 text-sm rounded bg-destructive/10 text-destructive border border-destructive/20">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {sucesso && (
          <div className="flex items-center gap-2 p-4 text-sm rounded bg-green-500/10 text-green-500 border border-green-500/20">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            <span>Ferramenta integrada e salva no ecossistema FiveLib com sucesso!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Nome da Ferramenta</label>
              <Input 
                value={formData.nome}
                placeholder="Ex: FastAPI" 
                onChange={e => setFormData({...formData, nome: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Descrição Curta</label>
              <Textarea 
                value={formData.descricao}
                placeholder="Descreva o que este recurso faz..." 
                onChange={e => setFormData({...formData, descricao: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">URL da Documentação Oficial</label>
              <Input 
                value={formData.url_oficial}
                placeholder="https://fastapi.tiangolo.com" 
                onChange={e => setFormData({...formData, url_oficial: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Linguagem Base</label>
              <Input 
                value={formData.linguagem}
                placeholder="Ex: Python" 
                onChange={e => setFormData({...formData, linguagem: e.target.value})} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Tags de Busca (Separadas por vírgula)</label>
              <Input 
                placeholder="backend, api, async, rest" 
                onChange={e => {
                  const tagsLimpas = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
                  setFormData({...formData, tags: tagsLimpas})
                }} 
              />
            </div>
            
            <Button className="w-full gap-2 mt-4" onClick={handleSalvar} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Registrando na Base...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> Salvar na FiveLib
                </>
              )}
            </Button>
          </div>

          {showPreview && (
            <div className="sticky top-8">
              <p className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">Visualização em Tempo Real</p>
              <div className="border border-dashed border-border rounded-lg p-4 bg-secondary/10">
                <ToolPreview data={formData} />
              </div>
            </div>
          )}
        </div>
      </div>

      <hr className="border-border" />

      {/* Seção da Listagem de Ferramentas Existentes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Ferramentas Cadastradas</h2>
            <p className="text-sm text-muted-foreground">Lista de todos os recursos atualmente visíveis na plataforma.</p>
          </div>
          <Button onClick={carregarFerramentas} variant="outline" size="sm" disabled={loadingList}>
            {loadingList ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="ml-2">Atualizar Catálogo</span>
          </Button>
        </div>

        <div className="rounded-md border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead>Nome / Linguagem</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[120px] text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingList ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span>Buscando registros do banco...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : ferramentas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    Nenhuma ferramenta cadastrada no banco de dados até o momento.
                  </TableCell>
                </TableRow>
              ) : (
                ferramentas.map((tool) => {
                  const isDeletingThis = deletingId !== null && String(deletingId) === String(tool.id);
                  
                  return (
                    <TableRow key={tool.id} className="border-border hover:bg-secondary/10">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">{tool.nome}</span>
                          <span className="text-xs text-muted-foreground">{tool.linguagem || "Não especificada"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground text-sm">
                        {tool.descricao}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {tool.tags && tool.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px] bg-secondary/50 border-none font-normal text-muted-foreground">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a href={tool.url_oficial} target="_blank" rel="noreferrer">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeletar(tool.id);
                            }}
                          >
                            {isDeletingThis ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}