"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Mail, Lock, User, ArrowRight, Github, Calendar, Loader2, Check, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { register, RegisterData } from "../../services/api"

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

  // Regras de validação idênticas ao perfil
  const senhaTemTamanhoMinimo = password.length >= 8
  const senhaTemMaiuscula = /[A-Z]/.test(password)
  const senhaTemMinuscula = /[a-z]/.test(password)

  // Validação estrita para habilitar o envio
  const senhaValidaParaEnvio = password.length > 0 && senhaTemTamanhoMinimo && senhaTemMaiuscula && senhaTemMinuscula

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "bg-border" }
    
    let points = 0
    if (password.length >= 8) points += 1
    if (/[A-Z]/.test(password)) points += 1
    if (/[a-z]/.test(password)) points += 1
    if (/[0-9]/.test(password)) points += 1

    switch (points) {
      case 1: return { score: 25, label: "Fraca", color: "bg-destructive" }
      case 2: return { score: 50, label: "Mediana", color: "bg-amber-500" }
      case 3: return { score: 75, label: "Boa", color: "bg-blue-500" }
      case 4: return { score: 100, label: "Forte", color: "bg-emerald-500" }
      default: return { score: 0, label: "Fraca", color: "bg-destructive" }
    }
  }

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!acceptTerms) {
      setError("Você precisa aceitar os Termos de Uso e a Política de Privacidade.")
      return
    }

    if (!senhaValidaParaEnvio) {
      setError("A senha escolhida não atende a todos os critérios de segurança mínimos.")
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
      } as RegisterData)

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
                    Não é permitido cadastro de menores de 13 anos.
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

                {/* Bloco Unificado da força da senha e critérios visuais do Perfil */}
                {password && (
                  <div className="p-2.5 rounded-lg border bg-secondary/20 border-border/50 space-y-2.5 transition-all">
                    
                    {/* Barra de Progresso reativa */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-wide">
                        <span>Força da Senha</span>
                        <span className="font-sans font-extrabold">{strength.label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${strength.color}`} 
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>

                    <span className="text-[10px] font-bold text-muted-foreground block uppercase tracking-wider pt-1 border-t border-border/30">Critérios obrigatórios:</span>
                    
                    <div className="grid gap-1.5 grid-cols-1 sm:grid-cols-3">
                      <div className="flex items-center gap-1.5 text-xs">
                        {senhaTemTamanhoMinimo ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive shrink-0" />
                        )}
                        <span className={senhaTemTamanhoMinimo ? "text-emerald-500 font-medium" : "text-muted-foreground text-[11px]"}>
                          Pelo menos 8 carac.
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        {senhaTemMaiuscula ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive shrink-0" />
                        )}
                        <span className={senhaTemMaiuscula ? "text-emerald-500 font-medium" : "text-muted-foreground text-[11px]"}>
                          Letra Maiúscula
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs">
                        {senhaTemMinuscula ? (
                          <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive shrink-0" />
                        )}
                        <span className={senhaTemMinuscula ? "text-emerald-500 font-medium" : "text-muted-foreground text-[11px]"}>
                          Letra Minúscula
                        </span>
                      </div>
                    </div>

                  </div>
                )}

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
                  className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                  disabled={!acceptTerms || !senhaValidaParaEnvio || isLoading}
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
              {/*
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
              */}
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