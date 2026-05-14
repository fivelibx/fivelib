"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function PrivacidadePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="mb-6">
            <Link href="/cadastro" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar para o cadastro
            </Link>
          </div>

          <Card className="border-border bg-card">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-2xl font-bold text-foreground">Política de Privacidade</CardTitle>
              <p className="text-sm text-muted-foreground">Última atualização: 13 de Maio de 2026</p>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-muted-foreground text-sm leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">1. Coleta de Dados</h2>
                <p>Coletamos dados estritamente necessários para o funcionamento e segurança da plataforma, incluindo nome, endereço de e-mail válido, data de nascimento e credenciais de acesso criptografadas.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">2. Uso das Informações</h2>
                <p>Os dados coletados são utilizados exclusivamente para autenticação de identidade, prevenção de fraudes, recuperação de credenciais e comunicações sistêmicas ligadas à plataforma.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">3. Proteção e Armazenamento</h2>
                <p>Todas as senhas são convertidas em hashes criptográficos antes do armazenamento. Os dados são mantidos em infraestrutura de banco de dados segura provida pelo Supabase com regras estritas de acesso.</p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}