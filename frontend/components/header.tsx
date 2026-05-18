"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, BookOpen, User, LogOut, Library, HelpCircle, ChevronDown } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface HeaderProps {
  isLoggedIn?: boolean
  userName?: string
}

export function Header({ isLoggedIn: initialIsLoggedIn = false, userName: initialUserName = "Usuário" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn)
  const [userName, setUserName] = useState(initialUserName)

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const savedName = localStorage.getItem("user_name")

    if (token) {
      setIsLoggedIn(true)
      if (savedName) setUserName(savedName)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_role")
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Five<span className="text-primary">Lib</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/busca" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Buscar
          </Link>
          {isLoggedIn && (
            // 💡 AJUSTADO: Apontando para o diretório real /dashboard
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Minha Biblioteca
            </Link>
          )}
          <Link href="/suporte" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Suporte
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/busca">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
          </Link>
          
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <Button 
                variant="ghost" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`gap-2 text-foreground transition-all hover:bg-secondary ${dropdownOpen ? 'bg-secondary' : ''}`}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="font-medium">{userName}</span>
                <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </Button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-card p-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in-50 slide-in-from-top-1">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-xs text-muted-foreground">Logado como</p>
                    <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                  </div>

                  <Link href="/perfil" onClick={() => setDropdownOpen(false)}>
                    <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Ver Perfil
                    </button>
                  </Link>

                  {/* 💡 AJUSTADO: Redirecionamento corrigido para /dashboard */}
                  <Link href="/dashboard" onClick={() => setDropdownOpen(false)}>
                    <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <Library className="h-4 w-4 text-muted-foreground" />
                      Minha Biblioteca
                    </button>
                  </Link>

                  <Link href="/suporte/meus-chamados" onClick={() => setDropdownOpen(false)}>
                    <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      Meus Chamados
                    </button>
                  </Link>

                  <div className="border-t border-border my-1" />

                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da Conta
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Entrar
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Menu</span>
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/busca"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buscar
            </Link>
            {isLoggedIn && (
              // 💡 AJUSTADO: Rota mobile corrigida para /dashboard
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Minha Biblioteca
              </Link>
            )}
            <Link
              href="/suporte"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Suporte
            </Link>
            
            <div className="mt-2 flex flex-col gap-1 border-t border-border pt-4">
              {isLoggedIn ? (
                <>
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Minha Área</p>
                  <Link href="/perfil" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm font-normal text-muted-foreground">
                      <User className="h-4 w-4" />
                      Ver Perfil
                    </Button>
                  </Link>
                  {/* 💡 AJUSTADO: Rota mobile corrigida para /dashboard */}
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm font-normal text-muted-foreground">
                      <Library className="h-4 w-4" />
                      Minha Biblioteca
                    </Button>
                  </Link>
                  <Link href="/suporte/meus-chamados" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm font-normal text-muted-foreground">
                      <HelpCircle className="h-4 w-4" />
                      Meus Chamados
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="w-full justify-start gap-2 h-9 text-sm font-normal text-destructive hover:bg-destructive/10 mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair da Conta
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/cadastro" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Cadastrar
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}