"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function GestaoTickets() {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tickets de Suporte</h1>
      <div className="border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário/E-mail</TableHead>
              <TableHead>Seção</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapeamento dos tickets vindos do Supabase */}
            <TableRow>
              <TableCell>lucas@exemplo.com</TableCell>
              <TableCell>Busca de Bibliotecas</TableCell>
              <TableCell className="max-w-xs truncate">O link da lib X está quebrado...</TableCell>
              <TableCell><Badge>Pendente</Badge></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}