"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getMeusTickets, UserTicketResponse } from "@/services/api"
import { 
  Loader2, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PlusCircle
} from "lucide-react"

export default function MeusChamadosPage() {
  const [tickets, setTickets] = useState<UserTicketResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getMeusTickets()
        // Ordena por data mais recente de criação (criado_at)
        data.sort((a, b) => new Date(b.criado_at).getTime() - new Date(a.criado_at).getTime())
        setTickets(data)
      } catch (err: any) {
        setError(err.message || "Não foi possível carregar os chamados.")
      } finally {
        setIsLoading(false)
      }
    }

    loadTickets()
  }, [])

  const renderStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pendente":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-medium text-yellow-500">
            <Clock className="h-3 w-3" />
            Pendente
          </span>
        )
      case "em_andamento":
      case "andamento":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500">
            <MessageSquare className="h-3 w-3" />
            Em Análise
          </span>
        )
      case "resolvido":
      case "concluido":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">
            <CheckCircle2 className="h-3 w-3" />
            Resolvido
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {status}
          </span>
        )
    }
  }

  return (
    <div className="container mx-auto p-1 py-4">
      <div className="mx-auto max-w-4xl">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Meus <span className="text-primary">Chamados</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Acompanhe o histórico e o andamento das suas solicitações.
              </CardDescription>
            </div>
            <Link href="/suporte">
              <Button size="sm" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Novo Chamado
              </Button>
            </Link>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm">Carregando histórico...</p>
              </div>
            ) : error ? (
              <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-7">
                  Certifique-se de que a rota correspondente (ex: <code className="bg-secondary px-1 py-0.5 rounded">GET /tickets</code>) está criada e ativa no seu backend Python.
                </p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-lg">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                <h3 className="font-medium text-foreground mb-1">Nenhum chamado encontrado</h3>
                <p className="text-sm text-muted-foreground mb-4">Você não possui nenhuma solicitação aberta no momento.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="p-5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-mono text-muted-foreground">#{ticket.id}</span>
                        <h4 className="font-semibold text-foreground capitalize mt-0.5">
                          {ticket.secao_site.replace("-", " ")}
                        </h4>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {renderStatus(ticket.status)}
                        <span className="text-xs text-muted-foreground">
                          {new Date(ticket.criado_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded border border-border/50 whitespace-pre-wrap">
                      {ticket.mensagem}
                    </p>

                    {ticket.observacao_admin && (
                      <div className="mt-4 p-3 rounded bg-primary/5 border border-primary/10">
                        <span className="text-xs font-bold text-primary block mb-1">Resposta do Administrador:</span>
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {ticket.observacao_admin}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}