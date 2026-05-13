"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, ArrowLeft } from "lucide-react"

export default function TermosPage() {
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
              <CardTitle className="text-2xl font-bold text-foreground">Termos de Uso</CardTitle>
              <p className="text-sm text-muted-foreground">Última atualização: 13 de Maio de 2026</p>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 text-muted-foreground text-sm leading-relaxed">
              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">1. Aceitação dos Termos</h2>
                <p>Ao criar uma conta na plataforma FiveLib, você concorda explicitamente em cumprir e estar vinculado aos presentes Termos de Uso.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">2. Descrição do Serviço</h2>
                <p>O FiveLib é uma plataforma voltada para a centralização de documentação técnica, referências e recursos de apoio ao estudante de programação.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-semibold text-foreground">3. Cadastro e Segurança</h2>
                <p>Você é inteiramente responsável por manter a confidencialidade da senha associada à sua conta e por todas as atividades que ocorram sob o seu login.</p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}