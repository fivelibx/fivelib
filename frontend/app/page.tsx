import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Search, 
  BookMarked, 
  Users, 
  Zap, 
  ArrowRight, 
  Code2, 
  Database, 
  Palette, 
  Server,
  Smartphone,
  Shield
} from "lucide-react"

const categories = [
  { name: "Frontend", icon: Palette, count: 245, color: "bg-blue-500/10 text-blue-400" },
  { name: "Backend", icon: Server, count: 189, color: "bg-green-500/10 text-green-400" },
  { name: "Database", icon: Database, count: 87, color: "bg-purple-500/10 text-purple-400" },
  { name: "Mobile", icon: Smartphone, count: 134, color: "bg-orange-500/10 text-orange-400" },
  { name: "DevOps", icon: Code2, count: 96, color: "bg-red-500/10 text-red-400" },
  { name: "Segurança", icon: Shield, count: 62, color: "bg-yellow-500/10 text-yellow-400" },
]

const popularLibraries = [
  { name: "React", language: "JavaScript", stars: "220k", category: "Frontend" },
  { name: "Next.js", language: "JavaScript", stars: "120k", category: "Frontend" },
  { name: "TailwindCSS", language: "CSS", stars: "80k", category: "Frontend" },
  { name: "Node.js", language: "JavaScript", stars: "100k", category: "Backend" },
  { name: "PostgreSQL", language: "SQL", stars: "15k", category: "Database" },
  { name: "Docker", language: "DevOps", stars: "70k", category: "DevOps" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Zap className="h-4 w-4" />
                <span>Plataforma para desenvolvedores</span>
              </div>
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Todas as bibliotecas em um{" "}
                <span className="text-primary">único lugar</span>
              </h1>
              <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
                Encontre documentações oficiais, tutoriais e ferramentas de desenvolvimento. 
                Centralize seus recursos favoritos e acelere seu aprendizado.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/busca">
                  <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Search className="h-5 w-5" />
                    Explorar Bibliotecas
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button size="lg" variant="outline" className="gap-2 border-border hover:border-primary hover:text-primary">
                    Criar Conta Grátis
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Por que usar o <span className="text-primary">FiveLib</span>?
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Simplificamos sua jornada de aprendizado centralizando tudo que você precisa
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-border bg-card transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Busca Inteligente</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Encontre bibliotecas e ferramentas por nome, linguagem ou categoria em segundos
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookMarked className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Biblioteca Pessoal</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Salve seus links favoritos e organize suas referências em um só lugar
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border bg-card transition-colors hover:border-primary/50">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">Comunidade Ativa</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Conecte-se com outros desenvolvedores e compartilhe experiências
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">Categorias</h2>
                <p className="text-muted-foreground">Explore por área de desenvolvimento</p>
              </div>
              <Link href="/busca">
                <Button variant="outline" className="hidden gap-2 border-border hover:border-primary hover:text-primary sm:flex">
                  Ver Todas
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link key={category.name} href={`/busca?categoria=${category.name.toLowerCase()}`}>
                  <Card className="group border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${category.color}`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary">
                          {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{category.count} bibliotecas</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Libraries */}
        <section className="border-b border-border py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-3xl font-bold text-foreground">Bibliotecas Populares</h2>
                <p className="text-muted-foreground">As mais acessadas pela comunidade</p>
              </div>
              <Link href="/busca">
                <Button variant="outline" className="hidden gap-2 border-border hover:border-primary hover:text-primary sm:flex">
                  Ver Mais
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {popularLibraries.map((lib) => (
                <Card key={lib.name} className="group border-border bg-card transition-all hover:border-primary/50">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                          {lib.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{lib.language}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        ⭐ {lib.stars}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                        {lib.category}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary">
                        Ver docs
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center md:p-16">
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Pronto para acelerar seu <span className="text-primary">aprendizado</span>?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                Crie sua conta gratuitamente e tenha acesso a todas as funcionalidades. 
                Salve favoritos, adicione links privados e muito mais.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/cadastro">
                  <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    Começar Agora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/busca">
                  <Button size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary">
                    Explorar sem conta
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
