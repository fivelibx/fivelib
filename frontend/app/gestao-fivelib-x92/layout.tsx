"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, Users, Wrench, MessageSquare, 
  ArrowLeft, LogOut, BookOpen 
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const role = localStorage.getItem("user_role")
    const token = localStorage.getItem("access_token")

    if (!token || role !== "admin") {
      router.push("/") 
    } else {
      setLoading(false)
    }
  }, [router])

  if (loading) return <div className="flex h-screen items-center justify-center bg-background text-muted-foreground text-sm">Validando credenciais...</div>

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/gestao-fivelib-x92" },
    { name: "Usuários", icon: Users, href: "/gestao-fivelib-x92/usuarios" },
    { name: "Ferramentas", icon: Wrench, href: "/gestao-fivelib-x92/ferramentas" },
    { name: "Tickets", icon: MessageSquare, href: "/gestao-fivelib-x92/suporte" },
  ]

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar Fixa */}
      <aside className="w-64 border-r border-border bg-card flex flex-col fixed h-full z-40">
        <div className="p-6 flex items-center gap-2 border-b border-border">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">FiveLib <span className="text-xs text-muted-foreground font-mono">ADM</span></span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 transition-colors ${pathname === item.href ? "bg-primary/10 text-primary font-semibold" : "hover:text-primary"}`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Voltar ao Site
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-500 hover:text-red-400 hover:bg-red-500/5"
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
          >
            <LogOut className="h-4 w-4" /> Sair
          </Button>
        </div>
      </aside>

      {/* Conteúdo Dinâmico */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  )
}