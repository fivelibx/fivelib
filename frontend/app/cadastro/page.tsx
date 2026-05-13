"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Mail, Lock, User, ArrowRight, Github, Calendar, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "../../services/api"

export default function CadastroPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!acceptTerms) {
      setError("Você precisa aceitar os Termos de Uso e a Política de Privacidade.")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setIsLoading(true)

    try {
      await register({
        nome: name,
        email: email,
        senha: password,
        data_nascimento: birthDate,
        accepted_terms: acceptTerms,
      })

      router.push(`/verificar-conta?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      setError(err.message || "Erro ao conectar com o servidor.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <BookOpen className="h-7 w-7 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-foreground">
              Crie sua conta
            </h1>
            <p className="mt-2 text-muted-foreground">
              Junte-se à comunidade FiveLib
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl text-foreground">Cadastro</CardTitle>
              <CardDescription className="text-muted-foreground">
                Preencha os dados para criar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    E-mail
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-foreground">
                    Data de nascimento
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Menores de 18 anos possuem restrições na abertura de chamados.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1 border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-relaxed text-muted-foreground cursor-pointer select-none"
                  >
                    Eu concordo com os{" "}
                    <Link href="/termos" className="text-primary hover:underline" target="_blank">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link href="/privacidade" className="text-primary hover:underline" target="_blank">
                      Política de Privacidade
                    </Link>.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!acceptTerms || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Criar Conta
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    ou cadastre-se com
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full gap-2 border-border text-foreground hover:border-primary hover:text-primary"
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Faça login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}