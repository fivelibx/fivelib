"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Sobre o <span className="text-primary">FiveLib</span></h1>
        
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            O FiveLib nasceu para ser muito mais do que um índice; ele é um guia essencial para desenvolvedores. 
            Em meio à vastidão de tecnologias disponíveis, nosso objetivo é ajudar você a se organizar, 
            perder menos tempo procurando a documentação correta e focar no que importa: construir soluções.
          </p>
          
          <h2 className="text-xl font-semibold text-foreground mt-8">Objetivo</h2>
          <p>
            Atuar como um norte para desenvolvedores de todos os níveis. Queremos que o FiveLib seja o guia 
            que simplifica a entrada no mundo do desenvolvimento, oferecendo um catálogo curado, rápido e acessível, 
            permitindo que você encontre o caminho certo para seus projetos, independente da linguagem ou stack.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8">O Futuro</h2>
          <p>
            Nas próximas atualizações, estamos trabalhando em:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sistema avançado de busca por tags e compatibilidade.</li>
            <li>Integração com feedback da comunidade.</li>
            <li>Notificações de atualização de versões para suas ferramentas favoritas.</li>
          </ul>

            <div className="mt-12 p-6 bg-secondary/50 rounded-lg border border-border">
                <h3 className="font-semibold text-foreground mb-2">Desenvolvimento</h3>
                <p className="text-sm">
                    O FiveLib é um projeto fundado e liderado por <strong>lucaspaiva-lp</strong>.
                    A arquitetura e a evolução do projeto são conduzidas por ele, com o suporte de contribuições 
                    eventuais da comunidade e participação dos colaboradores. {" "}
                    <Link 
                    href="https://github.com/fivelibx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                    >
                    Acompanhe o progresso e contribua no GitHub.
                    </Link>
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}