import Link from "next/link"
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Five<span className="text-primary">Lib</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Hub centralizado de bibliotecas, frameworks e documentações técnicas para desenvolvedores. 
              Encontre tudo que você precisa para acelerar seu aprendizado.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/busca" className="text-muted-foreground transition-colors hover:text-primary">
                  Buscar Bibliotecas
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
                  Minha Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-muted-foreground transition-colors hover:text-primary">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/suporte" className="text-muted-foreground transition-colors hover:text-primary">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-muted-foreground transition-colors hover:text-primary">
                  Reportar Problema
                </Link>
              </li>
              <li>
                <Link href="/suporte" className="text-muted-foreground transition-colors hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 FiveLib. Todos os direitos reservados.</p>
          <p className="mt-1">
            Desenvolvido por Mateus Alves, Lucas Paiva, Nicolas R. Santos, Felipe Gonçalves e Rodrigo Moraes
          </p>
        </div>
      </div>
    </footer>
  )
}
