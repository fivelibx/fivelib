"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Search, 
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Users,
  MessageSquare,
  Shield,
  Ban,
  UserX,
  Eye
} from "lucide-react"

const mockTickets = [
  {
    id: 1,
    userName: "João Silva",
    email: "joao@email.com",
    type: "Link Quebrado",
    section: "Busca de Bibliotecas",
    description: "O link da documentação do React está retornando erro 404",
    status: "Pendente",
    createdAt: "2026-03-25",
  },
  {
    id: 2,
    userName: "Maria Santos",
    email: "maria@email.com",
    type: "Bug/Erro no Sistema",
    section: "Dashboard",
    description: "Ao tentar adicionar um link privado, a página trava e não salva",
    status: "Pendente",
    createdAt: "2026-03-24",
  },
  {
    id: 3,
    userName: "Pedro Costa",
    email: "pedro@email.com",
    type: "Sugestão de Melhoria",
    section: "Página Inicial",
    description: "Seria interessante ter um modo escuro na plataforma",
    status: "Analisando",
    createdAt: "2026-03-23",
  },
  {
    id: 4,
    userName: "Ana Oliveira",
    email: "ana@email.com",
    type: "Link Quebrado",
    section: "Busca de Bibliotecas",
    description: "Link do Vue.js está desatualizado",
    status: "Resolvido",
    createdAt: "2026-03-22",
  },
  {
    id: 5,
    userName: "Carlos Lima",
    email: "carlos@email.com",
    type: "Dúvida",
    section: "Login/Cadastro",
    description: "Como faço para recuperar minha senha?",
    status: "Resolvido",
    createdAt: "2026-03-21",
  },
]

const mockUsers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    status: "Ativo",
    registeredAt: "2026-01-15",
    favorites: 12,
    privateLinks: 5,
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    status: "Ativo",
    registeredAt: "2026-02-20",
    favorites: 8,
    privateLinks: 3,
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    status: "Restrito",
    registeredAt: "2026-01-10",
    favorites: 25,
    privateLinks: 10,
  },
  {
    id: 4,
    name: "Ana Oliveira",
    email: "ana@email.com",
    status: "Ativo",
    registeredAt: "2026-03-01",
    favorites: 4,
    privateLinks: 2,
  },
  {
    id: 5,
    name: "Carlos Lima",
    email: "carlos@email.com",
    status: "Banido",
    registeredAt: "2025-12-10",
    favorites: 0,
    privateLinks: 0,
  },
]

type TicketStatus = "Pendente" | "Analisando" | "Resolvido" | "Rejeitado"
type UserStatus = "Ativo" | "Restrito" | "Banido"

export default function AdminPage() {
  const [tickets, setTickets] = useState(mockTickets)
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null)
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false)

  const getStatusBadge = (status: TicketStatus) => {
    const styles = {
      Pendente: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Analisando: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Resolvido: "bg-green-500/10 text-green-500 border-green-500/20",
      Rejeitado: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    const icons = {
      Pendente: <Clock className="h-3 w-3" />,
      Analisando: <AlertTriangle className="h-3 w-3" />,
      Resolvido: <CheckCircle className="h-3 w-3" />,
      Rejeitado: <XCircle className="h-3 w-3" />,
    }
    return (
      <Badge variant="outline" className={`gap-1 ${styles[status]}`}>
        {icons[status]}
        {status}
      </Badge>
    )
  }

  const getUserStatusBadge = (status: UserStatus) => {
    const styles = {
      Ativo: "bg-green-500/10 text-green-500 border-green-500/20",
      Restrito: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Banido: "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return (
      <Badge variant="outline" className={styles[status]}>
        {status}
      </Badge>
    )
  }

  const updateTicketStatus = (ticketId: number, newStatus: TicketStatus) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    ))
  }

  const updateUserStatus = (userId: number, newStatus: UserStatus) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: newStatus } : u
    ))
  }

  const pendingTickets = tickets.filter(t => t.status === "Pendente").length
  const activeUsers = users.filter(u => u.status === "Ativo").length

  const filteredTickets = tickets.filter(t =>
    t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header isLoggedIn userName="Admin" />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Shield className="h-4 w-4" />
              Painel Administrativo
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Gestão do <span className="text-primary">Sistema</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie tickets de suporte e usuários da plataforma
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 sm:grid-cols-4">
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingTickets}</p>
                  <p className="text-sm text-muted-foreground">Tickets Pendentes</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{tickets.length}</p>
                  <p className="text-sm text-muted-foreground">Total de Tickets</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeUsers}</p>
                  <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total de Usuários</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar tickets ou usuários..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="tickets" className="space-y-6">
            <TabsList className="border border-border bg-secondary">
              <TabsTrigger
                value="tickets"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <MessageSquare className="h-4 w-4" />
                Tickets de Suporte
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4" />
                Gestão de Usuários
              </TabsTrigger>
            </TabsList>

            {/* Tickets Tab */}
            <TabsContent value="tickets">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Tickets de Suporte</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Visualize e gerencie as solicitações de suporte dos usuários (RN04)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">ID</TableHead>
                          <TableHead className="text-muted-foreground">Usuário</TableHead>
                          <TableHead className="text-muted-foreground">Tipo</TableHead>
                          <TableHead className="text-muted-foreground">Seção</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                          <TableHead className="text-muted-foreground">Data</TableHead>
                          <TableHead className="text-muted-foreground text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTickets.map((ticket) => (
                          <TableRow key={ticket.id} className="border-border">
                            <TableCell className="font-medium text-foreground">#{ticket.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{ticket.userName}</p>
                                <p className="text-xs text-muted-foreground">{ticket.email}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{ticket.type}</TableCell>
                            <TableCell className="text-muted-foreground">{ticket.section}</TableCell>
                            <TableCell>{getStatusBadge(ticket.status as TicketStatus)}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Ações</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border-border bg-card">
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedTicket(ticket)
                                      setIsTicketDialogOpen(true)
                                    }}
                                    className="gap-2 text-foreground"
                                  >
                                    <Eye className="h-4 w-4" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => updateTicketStatus(ticket.id, "Analisando")}
                                    className="gap-2 text-blue-500"
                                  >
                                    <AlertTriangle className="h-4 w-4" />
                                    Marcar como Analisando
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => updateTicketStatus(ticket.id, "Resolvido")}
                                    className="gap-2 text-green-500"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Marcar como Resolvido
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => updateTicketStatus(ticket.id, "Rejeitado")}
                                    className="gap-2 text-red-500"
                                  >
                                    <XCircle className="h-4 w-4" />
                                    Rejeitar
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-foreground">Gestão de Usuários</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Gerencie os usuários da plataforma (UC03/UC04)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                          <TableHead className="text-muted-foreground">ID</TableHead>
                          <TableHead className="text-muted-foreground">Usuário</TableHead>
                          <TableHead className="text-muted-foreground">Status</TableHead>
                          <TableHead className="text-muted-foreground">Cadastro</TableHead>
                          <TableHead className="text-muted-foreground">Favoritos</TableHead>
                          <TableHead className="text-muted-foreground">Links Privados</TableHead>
                          <TableHead className="text-muted-foreground text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} className="border-border">
                            <TableCell className="font-medium text-foreground">#{user.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{getUserStatusBadge(user.status as UserStatus)}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {new Date(user.registeredAt).toLocaleDateString("pt-BR")}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{user.favorites}</TableCell>
                            <TableCell className="text-muted-foreground">{user.privateLinks}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Ações</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border-border bg-card">
                                  <DropdownMenuItem
                                    onClick={() => updateUserStatus(user.id, "Ativo")}
                                    className="gap-2 text-green-500"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Ativar Usuário
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => updateUserStatus(user.id, "Restrito")}
                                    className="gap-2 text-yellow-500"
                                  >
                                    <UserX className="h-4 w-4" />
                                    Restringir Usuário (UC04)
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => updateUserStatus(user.id, "Banido")}
                                    className="gap-2 text-red-500"
                                  >
                                    <Ban className="h-4 w-4" />
                                    Banir Usuário (UC03)
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Ticket Detail Dialog */}
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="border-border bg-card">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Ticket #{selectedTicket?.id}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Detalhes da solicitação de suporte
            </DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Usuário</p>
                  <p className="font-medium text-foreground">{selectedTicket.userName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium text-foreground">{selectedTicket.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium text-foreground">{selectedTicket.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Seção</p>
                  <p className="font-medium text-foreground">{selectedTicket.section}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedTicket.status as TicketStatus)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedTicket.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Descrição</p>
                <p className="mt-1 rounded-lg bg-secondary p-3 text-foreground">
                  {selectedTicket.description}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTicketDialogOpen(false)}
              className="border-border text-foreground"
            >
              Fechar
            </Button>
            <Button
              onClick={() => {
                if (selectedTicket) {
                  updateTicketStatus(selectedTicket.id, "Resolvido")
                  setIsTicketDialogOpen(false)
                }
              }}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <CheckCircle className="h-4 w-4" />
              Marcar como Resolvido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
