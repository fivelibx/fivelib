"use client"

import React, { useEffect, useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Shield, User, Search, Loader2, AlertCircle, RefreshCw, Eye } from "lucide-react"

// Importando as funções e interfaces reais do seu api.ts
import { getAdminUsers, atualizarPerfilUsuario, UserAdminResponse } from "@/services/api"

export default function GestaoUsuarios() {
  const [usuarios, setUsuarios] = useState<UserAdminResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busca, setBusca] = useState("")
  const [submittingId, setSubmittingId] = useState<string | null>(null)

  // Função para buscar os usuários do backend
  const carregarUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const dados = await getAdminUsers()
      setUsuarios(dados)
    } catch (err: any) {
      setError(err.message || "Erro ao carregar a listagem de usuários.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarUsuarios()
  }, [])

  // Função para disparar a alteração de cargo no banco de dados
  const handleAlterarPerfil = async (userId: string, novoPerfil: string) => {
    try {
      setSubmittingId(userId)
      setError(null)
      await atualizarPerfilUsuario(userId, { perfil: novoPerfil })
      
      // Atualiza o estado local imediatamente na tela
      setUsuarios(prev => prev.map(u => u.id === userId ? { ...u, perfil: novoPerfil } : u))
    } catch (err: any) {
      setError(err.message || "Não foi possível alterar as permissões deste usuário.")
    } finally {
      setSubmittingId(null)
    }
  }

  // Filtragem dinâmica por nome ou e-mail
  const usuariosFiltrados = usuarios.filter(u => 
    (u.nome?.toLowerCase() || "").includes(busca.toLowerCase()) || 
    (u.email?.toLowerCase() || "").includes(busca.toLowerCase())
  )

  // Função auxiliar para estilizar e colorir as badges de cargos
  const renderBadgePerfil = (perfil: string) => {
    switch (perfil) {
      case "superadmin":
        return (
          <Badge variant="default" className="gap-1 bg-red-600 hover:bg-red-600/90 text-white border-none uppercase text-[10px]">
            <Shield className="h-3 w-3" />
            SuperAdmin
          </Badge>
        )
      case "admin":
        return (
          <Badge variant="default" className="gap-1 bg-primary hover:bg-primary/90 uppercase text-[10px]">
            <Shield className="h-3 w-3" />
            Admin
          </Badge>
        )
      case "moderador":
        return (
          <Badge variant="secondary" className="gap-1 bg-amber-500 hover:bg-amber-500/90 text-black border-none uppercase text-[10px]">
            <Eye className="h-3 w-3" />
            Moderador
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="gap-1 border-border text-muted-foreground uppercase text-[10px]">
            <User className="h-3 w-3" />
            User
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestão de Usuários</h1>
          <p className="text-sm text-muted-foreground">Controle de acessos e cargos da plataforma.</p>
        </div>
        <Button onClick={carregarUsuarios} variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          <span className="ml-2">Atualizar</span>
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 text-sm rounded bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome ou e-mail..." 
            className="pl-10 bg-secondary/50 border-border"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead>Nome completo / Conta</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="w-[150px]">Cargo atual</TableHead>
              <TableHead className="w-[120px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Carregando base de usuários...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : usuariosFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              usuariosFiltrados.map((user) => (
                <TableRow key={user.id} className="border-border hover:bg-secondary/10">
                  <TableCell>
                    <span className="font-medium text-foreground">{user.nome}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {renderBadgePerfil(user.perfil)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          disabled={submittingId === user.id}
                          className="h-8 w-8 data-[state=open]:bg-secondary"
                        >
                          {submittingId === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border w-48">
                        <DropdownMenuLabel className="text-xs text-muted-foreground">Alterar Cargo para:</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border" />
                        
                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-xs"
                          onClick={() => handleAlterarPerfil(user.id, "user")}
                          disabled={user.perfil === "user"}
                        >
                          <User className="h-3.5 w-3.5 text-muted-foreground" /> Usuário Comum
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-xs"
                          onClick={() => handleAlterarPerfil(user.id, "moderador")}
                          disabled={user.perfil === "moderador"}
                        >
                          <Eye className="h-3.5 w-3.5 text-amber-500" /> Moderador
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-xs"
                          onClick={() => handleAlterarPerfil(user.id, "admin")}
                          disabled={user.perfil === "admin"}
                        >
                          <Shield className="h-3.5 w-3.5 text-primary" /> Administrador
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                          className="gap-2 cursor-pointer text-xs text-red-500 focus:text-red-500 font-medium"
                          onClick={() => handleAlterarPerfil(user.id, "superadmin")}
                          disabled={user.perfil === "superadmin"}
                        >
                          <Shield className="h-3.5 w-3.5 text-red-600" /> Atribuir SuperAdmin
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}