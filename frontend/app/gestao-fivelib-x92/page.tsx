"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Wrench, MessageSquare, Clock, RefreshCw, AlertCircle } from "lucide-react"
import { getDashboardStats, DashboardStats } from "@/services/api" // Ajuste o caminho do import se necessário

export default function AdminDashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)

  // Função encapsulada para buscar os dados da API
  const fetchStats = useCallback(async (isRefreshAction = false) => {
    if (isRefreshAction) {
      setIsRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      const data = await getDashboardStats()
      setStats(data)
    } catch (err: any) {
      setError(err.message || "Erro inesperado ao carregar estatísticas.")
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  // Carrega automaticamente ao montar a página
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando dados operacionais...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Cabeçalho com Título e Botão de Refresh */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral em tempo real da plataforma FiveLib.</p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full border-border bg-card hover:bg-accent sm:w-auto"
          onClick={() => fetchStats(true)}
          disabled={isRefreshing}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Atualizando..." : "Atualizar Dados"}
        </Button>
      </div>

      {/* Alerta de Erro caso a API falhe */}
      {error && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div className="text-sm font-medium">{error}</div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto hover:bg-destructive/20" 
            onClick={() => fetchStats(false)}
          >
            Tentar Novamente
          </Button>
        </div>
      )}

      {/* Grid de Cards Estatísticos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.total_usuarios ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ferramentas Ativas</CardTitle>
            <Wrench className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.ferramentas_ativas ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.tickets_pendentes ?? 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Suporte</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.total_suporte ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção futura para logs ou tabelas de atividade recente */}
    </div>
  )
}