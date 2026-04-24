"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  LogIn, 
  UserPlus, 
  Search, 
  LayoutDashboard, 
  HelpCircle, 
  Shield 
} from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/login", label: "Login", icon: LogIn },
  { href: "/cadastro", label: "Cadastro", icon: UserPlus },
  { href: "/busca", label: "Busca", icon: Search },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/suporte", label: "Suporte", icon: HelpCircle },
  { href: "/admin", label: "Admin", icon: Shield },
]

export function DemoNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <span className="px-3 text-xs font-medium text-muted-foreground">Demo:</span>
        {navItems.map((item) => (
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
