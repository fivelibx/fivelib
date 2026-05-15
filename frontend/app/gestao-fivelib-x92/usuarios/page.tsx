"use client"

import { useState } from "react"
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
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Shield, User, Ban, CheckCircle, Search } from "lucide-react"

const mockUsers = [
  { id: 1, nome: "Lucas Paiva", email: "lucas@exemplo.com", perfil: "admin", is_active: true },
  { id: 2, nome: "Mateus Alves", email: "mateus@exemplo.com", perfil: "user", is_active: true },
  { id: 3, nome: "Rodrigo Moraes", email: "rodrigo@exemplo.com", perfil: "user", is_active: false },
]

export default function GestaoUsuarios() {
  const [usuarios, setUsuarios] = useState(mockUsers)
  const [busca, setBusca] = useState("")

  const usuariosFiltrados = usuarios.filter(u => 
    u.nome.toLowerCase().includes(busca.toLowerCase()) || 
    u.email.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gestão de Usuários</h1>
        <p className="text-sm text-muted-foreground">Controle de acessos e permissões da plataforma.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por nome ou e-mail..." 
            className="pl-10 bg-secondary/50 border-border"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosFiltrados.map((user) => (
              <TableRow key={user.id} className="border-border">
                <TableCell className="font-mono text-xs">#{user.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.nome}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.perfil === "admin" ? "default" : "secondary"} className="gap-1">
                    {user.perfil === "admin" ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                    {user.perfil}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.is_active ? "outline" : "destructive"} className={user.is_active ? "text-green-500 border-green-500/20" : ""}>
                    {user.is_active ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <CheckCircle className="h-4 w-4 text-green-500" /> Ativar/Desativar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer">
                        <Shield className="h-4 w-4 text-primary" /> Tornar Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 cursor-pointer text-red-500 focus:text-red-500">
                        <Ban className="h-4 w-4" /> Banir (Restringir)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}