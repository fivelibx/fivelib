"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, BookOpen, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"


// interface HeaderProps {
//   isLoggedIn?: boolean
//   userName?: string
// }

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn]=useState(false)

  //verificando se o cookie existe ao carregar
  useEffect(()=>{
    const token = Cookies.get("fivelib_token")
    setIsLoggedIn(!!token)
  }, [])

  const handleLogout = ()=>{
    Cookies.remove("fivelib_token")
    setIsLoggedIn(false)
    router.push("/")
    router.refresh()
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
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
                  <User className="h-4 w-4" />
                  {/* {userName} */}Meu Perfil
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="icon" className="border-border hover:border-primary hover:text-primary">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Sair</span>
                </Button>
              </Link>
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
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <User className="h-4 w-4" />
                      {/* {userName} */}Meu perfil
                    </Button>
                  </Link>
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-destructive">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </Button>
                  </Link>
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
