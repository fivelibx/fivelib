"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, LogIn, UserPlus, Search, LayoutDashboard, HelpCircle, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"

interface DemoNavProps {
  isLoggedIn?: boolean
}

export function DemoNav({ isLoggedIn: initialIsLoggedIn = false }: DemoNavProps) {
  const pathname = usePathname()
  
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const role = localStorage.getItem("user_role")
    
    setIsLoggedIn(!!token)
    setUserRole(role)
  }, [pathname]) 

  if (pathname.startsWith("/gestao-fivelib-x92")) {
    return null
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/login", label: "Login", icon: LogIn, hideIfLogged: true },
    { href: "/cadastro", label: "Cadastro", icon: UserPlus, hideIfLogged: true },
    { href: "/busca", label: "Busca", icon: Search },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, protected: true },
    { href: "/gestao-fivelib-x92", label: "Admin", icon: ShieldCheck, adminOnly: true },
    { href: "/suporte", label: "Suporte", icon: HelpCircle },
  ]

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-2 shadow-lg backdrop-blur supports-backdrop-filter:bg-card/80">
        {navItems
          .filter(item => {
            if (item.adminOnly) {
              const temAcessoGestao = userRole === 'superadmin' || userRole === 'admin' || userRole === 'moderador'
              if (!temAcessoGestao) return false
            }
            if (item.protected && !isLoggedIn) return false
            if (item.hideIfLogged && isLoggedIn) return false
            return true
          })
          .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
      </div>
    </div>
  )
}