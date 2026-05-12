"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { BookOpen, ArrowRight, Loader2, MailCheck } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { verifyCode } from "../../services/api"

function VerificarContaContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || ""
  
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [emailParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (code.length !== 6) {
      setError("O código deve conter exatamente 6 dígitos.")
      return
    }

    setIsLoading(true)

    try {
      await verifyCode({
        email: email,
        code: code,
      })

      // Conta ativada! Agora sim vai para o login com flag de sucesso
      router.push("/login?registered=true")
    } catch (err: any) {
      setError(err.message || "Código inválido ou expirado.")
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
              Verifique seu e-mail
            </h1>
            <p className="mt-2 text-muted-foreground">
              Insira o código de 6 dígitos enviado para o seu e-mail
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="space-y-1 pb-4 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MailCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl text-foreground">Confirmar Código</CardTitle>
              <CardDescription className="text-muted-foreground break-all">
                Enviado para <span className="font-medium text-foreground">{email || "seu e-mail"}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
                {error && (
                  <div className="w-full rounded-lg bg-destructive/10 p-3 text-sm text-destructive font-medium text-center">
                    {error}
                  </div>
                )}

                {/* Input de Autenticação OTP Prontinho do Shadcn */}
                <div className="space-y-2 flex flex-col items-center">
                  <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(value) => setCode(value)}
                    disabled={isLoading}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="border-border bg-secondary text-foreground text-lg w-12 h-12 rounded-md focus:ring-primary" />
                      <InputOTPSlot index={1} className="border-border bg-secondary text-foreground text-lg w-12 h-12 rounded-md focus:ring-primary" />
                      <InputOTPSlot index={2} className="border-border bg-secondary text-foreground text-lg w-12 h-12 rounded-md focus:ring-primary" />
                      <InputOTPSlot index={3} className="border-border bg-secondary text-foreground text-lg w-12 h-12 rounded-md focus:ring-primary" />
                      <InputOTPSlot index={4} className="border-border bg-secondary text-foreground text-lg w-12 h-12 rounded-md focus:ring-primary" />
                      <InputOTPSlot index={5} className="border-border bg-secondary text-foreground text-lg w-12 h-12 rounded-md focus:ring-primary" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <Button
                  type="submit"
                  className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={code.length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verificando...
                    </>
                  ) : (
                    <>
                      Ativar Conta
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Não recebeu o código?{" "}
                  <Link href="/cadastro" className="font-medium text-primary hover:underline">
                    Tentar outro e-mail
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// O Next.js exige Suspense em torno de useSearchParams se usado em client-side rendering estático
export default function VerificarContaPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <VerificarContaContent />
    </Suspense>
  )
}