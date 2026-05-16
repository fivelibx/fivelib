"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Send, 
  HelpCircle, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Mail,
  User,
  Loader2
} from "lucide-react"

import { criarTicketSuporte } from "@/services/api"

const faqItems = [
  {
    question: "Como posso salvar uma biblioteca nos favoritos?",
    answer: "Para salvar uma biblioteca nos favoritos, você precisa estar logado na plataforma. Acesse a página de busca, encontre a biblioteca desejada e clique no ícone de coração. A biblioteca será automaticamente adicionada à sua biblioteca pessoal."
  },
  {
    question: "Posso adicionar links que não estão no FiveLib?",
    answer: "Sim! Usuários registrados podem adicionar URLs externas privadas à sua biblioteca pessoal. Basta acessar o Dashboard, clicar em 'Adicionar Link Privado' e preencher as informações. Esses links só serão visíveis para você."
  },
  {
    question: "Como reportar um link quebrado?",
    answer: "Se você encontrar um link que não está funcionando, utilize o formulário de suporte nesta página. Selecione a opção 'Link Quebrado' no tipo de problema e informe qual biblioteca está com o link inativo. Nossa equipe de moderação irá verificar e atualizar o link."
  },
  {
    question: "Qual é a idade mínima para se cadastrar?",
    answer: "De acordo com nossa política, o cadastro na plataforma é restrito a usuários com idade igual ou superior a 13 anos."
  },
  {
    question: "Meus links privados são visíveis para outros usuários?",
    answer: "Não. De acordo com nossas politicas de segurança, as preferências e links salvos na biblioteca pessoal são vinculados ao ID do usuário e não são visíveis para outros usuários registrados ou visitantes."
  },
  {
    question: "Quanto tempo leva para minha solicitação ser analisada?",
    answer: "Todas as mensagens enviadas pelo formulário de suporte recebem inicialmente o status 'Pendente' e são encaminhadas para nossa equipe administrativa. O tempo médio de resposta é de 48 a 72 horas úteis."
  },
]

export default function SuportePage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [problemType, setProblemType] = useState("")
  const [section, setSection] = useState("")
  const [description, setDescription] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      await criarTicketSuporte({
        email_contato: email,
        secao_site: section,
        mensagem: description
      })

      setSubmitted(true)
      

      setName("")
      setEmail("")
      setProblemType("")
      setSection("")
      setDescription("")
    } catch (err: any) {
      setErrorMessage(err.message || "Ocorreu um erro ao enviar sua solicitação.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">
              Central de <span className="text-primary">Suporte</span>
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Tire suas dúvidas, reporte problemas ou envie sugestões. 
              Nossa equipe está pronta para ajudar.
            </p>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* FAQ Section */}
              <div>
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Perguntas Frequentes
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Encontre respostas para as dúvidas mais comuns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="border-border"
                        >
                          <AccordionTrigger className="text-left text-foreground hover:text-primary">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                      Formulário de Suporte
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Reporte problemas, links quebrados ou envie sugestões
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="py-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                          <CheckCircle className="h-8 w-8 text-green-500" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium text-foreground">
                          Mensagem enviada com sucesso!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Sua solicitação foi registrada com status &quot;Pendente&quot; e será analisada pela nossa equipe.
                        </p>
                        <Button onClick={() => setSubmitted(false)} variant="outline">
                          Enviar outra mensagem
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        {errorMessage && (
                          <div className="p-3 text-sm rounded bg-destructive/10 text-destructive border border-destructive/20">
                            {errorMessage}
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
                              className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
                              required
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
                              className="border-border bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:border-primary"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="problemType" className="text-foreground">
                            Tipo de problema
                          </Label>
                          <Select value={problemType} onValueChange={setProblemType} required>
                            <SelectTrigger className="border-border bg-secondary text-foreground">
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent className="border-border bg-card">
                              <SelectItem value="link-quebrado">Link Quebrado</SelectItem>
                              <SelectItem value="bug">Bug/Erro no Sistema</SelectItem>
                              <SelectItem value="sugestao">Sugestão de Melhoria</SelectItem>
                              <SelectItem value="duvida">Dúvida</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="section" className="text-foreground">
                            Seção do site (onde ocorreu o problema)
                          </Label>
                          <Select value={section} onValueChange={setSection} required>
                            <SelectTrigger className="border-border bg-secondary text-foreground">
                              <SelectValue placeholder="Selecione a seção" />
                            </SelectTrigger>
                            <SelectContent className="border-border bg-card">
                              <SelectItem value="home">Página Inicial</SelectItem>
                              <SelectItem value="busca">Busca de Bibliotecas</SelectItem>
                              <SelectItem value="dashboard">Dashboard/Biblioteca Pessoal</SelectItem>
                              <SelectItem value="login">Login/Cadastro</SelectItem>
                              <SelectItem value="suporte">Suporte</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-foreground">
                            Descrição do problema
                          </Label>
                          <Textarea
                            id="description"
                            placeholder="Descreva detalhadamente o problema, dúvida ou sugestão..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[120px] border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:border-primary"
                            required
                          />
                        </div>

                        <p className="text-xs text-muted-foreground">
                          * O cadastro de contas e o envio de formulários através do módulo de suporte são restritos a usuários cadastrados no site.
                        </p>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Enviar Solicitação
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <Card className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-medium text-foreground">E-mail</h3>
                  <p className="text-sm text-muted-foreground">fivelibx@outlook.com</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-medium text-foreground">Tempo de Resposta</h3>
                  <p className="text-sm text-muted-foreground">48-72 horas úteis</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-1 font-medium text-foreground">Documentação</h3>
                  <Link href="/busca" className="text-sm text-primary hover:underline">
                    Acesse o FAQ completo
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}