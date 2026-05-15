"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Mail, Lock, ArrowRight, ArrowLeft, Loader2, CheckCircle2, RefreshCw } from "lucide-react"
import { forgotPassword, resetPassword } from "../../services/api"

type Step = "SOLICITAR" | "REDEFINIR" | "SUCESSO"

const translateBackendError = (msg: string): string => {
  if (!msg) return "Erro desconhecido.";
  

  if (msg.includes("String should have at least")) {
    const minChars = msg.match(/\d+/);
    return `A senha deve conter pelo menos ${minChars ? minChars[0] : '8'} caracteres.`;
  }
  if (msg.includes("String should have at most")) {
    const maxChars = msg.match(/\d+/);
    return `O campo deve conter no máximo ${maxChars ? maxChars[0] : '6'} caracteres.`;
  }
  if (msg.includes("value is not a valid email address")) {
    return "O formato do e-mail informado é inválido.";
  }
  if (msg.includes("Field required")) {
    return "Este campo é obrigatório.";
  }

  return msg;
};

export default function EsqueciSenhaPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("SOLICITAR")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estados do fluxo
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  // Estados do Reenvio de Código
  const [resendTimer, setResendTimer] = useState(0)

  // Controle do Timer de 60 segundos
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [resendTimer])

  // Lógica de cálculo de força da senha
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "bg-border" }
    
    let points = 0
    if (password.length >= 8) points += 1
    if (/[A-Z]/.test(password)) points += 1
    if (/[0-9]/.test(password)) points += 1
    if (/[^A-Za-z0-9]/.test(password)) points += 1

    switch (points) {
      case 1: return { score: 25, label: "Fraca", color: "bg-destructive" }
      case 2: return { score: 50, label: "Mediana", color: "bg-warning or bg-amber-500" }
      case 3: return { score: 75, label: "Boa", color: "bg-blue-500" }
      case 4: return { score: 100, label: "Forte", color: "bg-emerald-500" }
      default: return { score: 0, label: "Fraca", color: "bg-destructive" }
    }
  }

  const strength = getPasswordStrength(novaSenha)

  const handleSolicitarCodigo = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await forgotPassword({ email })
      setResendTimer(60) // Inicia cooldown de 1 minuto
      if (step !== "REDEFINIR") setStep("REDEFINIR")
    } catch (err: any) {
      if (err.data && Array.isArray(err.data.detail)) {
        setError(translateBackendError(err.data.detail[0].msg));
      } else if (err.data?.detail) {
        setError(typeof err.data.detail === "object" ? JSON.stringify(err.data.detail) : translateBackendError(err.data.detail));
      } else {
        setError(err.message || "Erro ao solicitar código de recuperação.");
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.")
      return
    }

    if (code.length !== 6) {
      setError("O código de verificação deve conter 6 dígitos.")
      return
    }

    setIsLoading(true)

    try {
      await resetPassword({
        email,
        code: String(code),
        nova_senha: novaSenha
      })
      setStep("SUCESSO")
    } catch (err: any) {
      if (err.data && Array.isArray(err.data.detail)) {
        setError(translateBackendError(err.data.detail[0].msg));
      } else if (err.data?.detail) {
        setError(typeof err.data.detail === "object" ? JSON.stringify(err.data.detail) : translateBackendError(err.data.detail));
      } else {
        setError(err.message || "Erro ao redefinir a senha. Verifique o código.");
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <BookOpen className="h-7 w-7 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-foreground">Recuperação de Conta</h1>
          </div>

          <Card className="border-border bg-card">
            {error && (
              <div className="mx-6 mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive font-medium">
                {error}
              </div>
            )}

            {step === "SOLICITAR" && (
              <>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl text-foreground">Esqueceu a senha?</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Insira seu e-mail cadastrado para receber o código de validação de 6 dígitos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSolicitarCodigo} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-border bg-secondary pl-10 text-foreground required"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full gap-2 bg-primary text-primary-foreground" disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Enviar Código <ArrowRight className="h-4 w-4" /></>}
                    </Button>

                    <div className="text-center pt-2">
                      <Link href="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Voltar para o Login
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {step === "REDEFINIR" && (
              <>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="text-xl text-foreground">Definir nova senha</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Código enviado para <span className="text-foreground font-medium">{email}</span>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRedefinirSenha} className="space-y-5">
                    
                    <div className="space-y-2 flex flex-col items-center">
                      <Label htmlFor="otp-code" className="text-foreground self-start">Código de Verificação</Label>
                      <InputOTP id="otp-code" maxLength={6} value={code} onChange={(value) => setCode(value)} disabled={isLoading}>
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3, 4, 5].map((idx) => (
                            <InputOTPSlot key={idx} index={idx} className="border-border bg-secondary text-foreground rounded-md" />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      
                      {/* Botão de Reenvio Controlado */}
                      <div className="w-full flex justify-end mt-1">
                        <button
                          type="button"
                          onClick={() => handleSolicitarCodigo()}
                          disabled={resendTimer > 0 || isLoading}
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary disabled:opacity-50 disabled:hover:text-muted-foreground bg-transparent border-0 cursor-pointer"
                        >
                          <RefreshCw className={`h-3 w-3 ${isLoading ? 'animate-spin' : ''}`} />
                          {resendTimer > 0 ? `Reenviar código (${resendTimer}s)` : "Reenviar código"}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="novaSenha">Nova Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="novaSenha"
                          type="password"
                          placeholder="Mínimo 8 caracteres"
                          value={novaSenha}
                          onChange={(e) => setNovaSenha(e.target.value)}
                          className="border-border bg-secondary pl-10 text-foreground"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      {/* Barra de Progresso de Força da Senha */}
                      {novaSenha && (
                        <div className="space-y-1 pt-1">
                          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 ${strength.color}`} 
                              style={{ width: `${strength.score}%` }}
                            />
                          </div>
                          <p className="text-right text-xs text-muted-foreground">
                            Força: <span className="font-medium text-foreground">{strength.label}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmarSenha"
                          type="password"
                          placeholder="Repita a senha"
                          value={confirmarSenha}
                          onChange={(e) => setConfirmarSenha(e.target.value)}
                          className="border-border bg-secondary pl-10 text-foreground"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Alterar Senha e Acessar"}
                    </Button>

                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => { setStep("SOLICITAR"); setError(null); }}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-0 cursor-pointer"
                        disabled={isLoading}
                      >
                        <ArrowLeft className="h-4 w-4" /> Alterar e-mail informado
                      </button>
                    </div>
                  </form>
                </CardContent>
              </>
            )}

            {step === "SUCESSO" && (
              <CardContent className="pt-6 text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">Senha alterada!</h2>
                  <p className="text-sm text-muted-foreground">
                    Sua credencial de segurança foi atualizada no banco de dados com sucesso.
                  </p>
                </div>
                <Button onClick={() => router.push("/login")} className="w-full bg-primary text-primary-foreground mt-2">
                  Ir para o Login
                </Button>
              </CardContent>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}