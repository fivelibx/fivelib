"use client"

import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertCircle, Save, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Importando as funções do seu api.ts
import { getAdminTickets, atualizarTicketSuporte, TicketAdminResponse } from "@/services/api"

export default function GestaoTickets() {
  const [tickets, setTickets] = useState<TicketAdminResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Estados locais para controlar qual ticket está sendo editado na observação e o estado do salvamento
  const [editingTicketId, setEditingTicketId] = useState<number | null>(null)
  const [observacaoTexto, setObservacaoTexto] = useState("")
  const [submittingId, setSubmittingId] = useState<number | null>(null)

  const buscarDados = async () => {
    try {
      setLoading(true)
      const dados = await getAdminTickets()
      setTickets(dados)
    } catch (err: any) {
      setError(err.message || "Erro ao carregar tickets de suporte.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarDados()
  }, [])

  const handleStatusChange = async (ticketId: number, novoStatus: string, observacaoAtual?: string) => {
    try {
      setSubmittingId(ticketId)
      await atualizarTicketSuporte(ticketId, {
        status: novoStatus,
        observacao_admin: observacaoAtual || ""
      })
      
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: novoStatus } : t))
    } catch (err: any) {
      setError(err.message || "Falha ao atualizar status do ticket.")
    } finally {
      setSubmittingId(null)
    }
  }

  const handleSalvarObservacao = async (ticketId: number, statusAtual: string) => {
    try {
      setSubmittingId(ticketId)
      await atualizarTicketSuporte(ticketId, {
        status: statusAtual,
        observacao_admin: observacaoTexto
      })

      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, observacao_admin: observacaoTexto } : t))
      setEditingTicketId(null)
    } catch (err: any) {
      setError(err.message || "Falha ao salvar observação.")
    } finally {
      setSubmittingId(null)
    }
  }

  // Ativa o modo de edição de observação para uma linha específica
  const iniciarEdicao = (ticketId: number, textoAtual?: string) => {
    setEditingTicketId(ticketId)
    setObservacaoTexto(textoAtual || "")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Tickets de Suporte</h1>
        <Button onClick={buscarDados} variant="outline" size="sm" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Atualizar Lista
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 text-sm rounded bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="border rounded-lg bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground w-[180px]">Usuário (Conta)</TableHead>
              <TableHead className="text-muted-foreground w-[180px]">E-mail de Contato</TableHead>
              <TableHead className="text-muted-foreground w-[120px]">Seção</TableHead>
              <TableHead className="text-muted-foreground">Mensagem do Chamado</TableHead>
              <TableHead className="text-muted-foreground w-[160px]">Status</TableHead>
              <TableHead className="text-muted-foreground w-[120px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Buscando solicitações...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhum ticket de suporte encontrado.
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket) => (
                <React.Fragment key={ticket.id}>
                  {/* Linha Principal do Ticket */}
                  <TableRow className="border-border hover:bg-secondary/20">
                    <TableCell className="font-medium text-foreground">
                      {ticket.user?.nome || "Usuário Desconhecido"}
                    </TableCell>
                    <TableCell className="text-foreground">{ticket.email_contato}</TableCell>
                    <TableCell className="capitalize text-foreground text-sm">
                      {ticket.secao_site.replace("-", " ")}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs break-words">
                      {ticket.mensagem}
                    </TableCell>
                    
                    {/* Select Interativo de Status */}
                    <TableCell>
                      <Select
                        defaultValue={ticket.status}
                        value={ticket.status}
                        onValueChange={(valor) => handleStatusChange(ticket.id, valor, ticket.observacao_admin)}
                        disabled={submittingId === ticket.id}
                      >
                        <SelectTrigger className="w-[140px] h-8 border-border bg-secondary text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-border bg-card">
                          <SelectItem value="pendente">Pendente</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="resolvido">Resolvido</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    {/* Botão para Abrir/Editar o Parecer Técnico */}
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-xs hover:bg-secondary"
                        onClick={() => editingTicketId === ticket.id ? setEditingTicketId(null) : iniciarEdicao(ticket.id, ticket.observacao_admin)}
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Parecer
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Campo Expansível para Responder/Anotar Observações */}
                  {editingTicketId === ticket.id && (
                    <TableRow className="bg-secondary/10 border-border hover:bg-secondary/10">
                      <TableCell colSpan={6} className="p-4">
                        <div className="space-y-3 max-w-3xl border rounded-lg p-4 bg-background border-border">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-foreground">
                              Parecer Técnico / Resposta do Administrador
                            </h4>
                            {ticket.observacao_admin && !observacaoTexto && (
                              <Badge variant="secondary" className="text-xs">Salvo</Badge>
                            )}
                          </div>
                          
                          <Textarea
                            placeholder="Descreva a solução do problema ou observações internas sobre este chamado..."
                            value={observacaoTexto}
                            onChange={(e) => setObservacaoTexto(e.target.value)}
                            className="min-h-[80px] bg-secondary border-border text-foreground"
                          />
                          
                          <div className="flex items-center gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setEditingTicketId(null)}
                              className="h-8 border-border"
                            >
                              Cancelar
                            </Button>
                            <Button 
                              size="sm" 
                              className="h-8 gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                              disabled={submittingId === ticket.id}
                              onClick={() => handleSalvarObservacao(ticket.id, ticket.status)}
                            >
                              {submittingId === ticket.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <Save className="h-3 w-3" />
                              )}
                              Salvar Parecer
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}