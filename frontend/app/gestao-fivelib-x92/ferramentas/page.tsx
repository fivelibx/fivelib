"use client"

import { useState } from "react"
import { ToolPreview } from "@/components/tool-preview"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ShieldCheck, Plus, Eye } from "lucide-react"

export default function GerenciarFerramentas() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    url_oficial: "",
    linguagem: "",
    stars: 0,
    tags: [] as string[],
    categoria: ""
  })

  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldCheck className="text-primary" /> Gestão de Ferramentas
        </h1>
        <p className="text-muted-foreground">Adicione ou remova recursos da biblioteca FiveLib.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <Input 
            placeholder="Nome da Ferramenta" 
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
          />
          <Textarea 
            placeholder="Descrição curta" 
            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              placeholder="Linguagem (ex: Python)" 
              onChange={(e) => setFormData({...formData, linguagem: e.target.value})}
            />
            <Input 
              placeholder="Estrelas (GitHub)" 
              type="number"
              onChange={(e) => setFormData({...formData, stars: parseInt(e.target.value)})}
            />
          </div>
          <Input 
            placeholder="Tags (separadas por vírgula)" 
            onChange={(e) => setFormData({...formData, tags: e.target.value.split(",")})}
          />
          
          <div className="flex gap-4 pt-4">
            <Button className="flex-1 gap-2" onClick={() => console.log("Salvar", formData)}>
              <Plus className="h-4 w-4" /> Cadastrar Ferramenta
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-4 w-4 mr-2" /> {showPreview ? "Ocultar Preview" : "Ver Preview"}
            </Button>
          </div>
        </div>

        {/* Preview Lateral */}
        <div className={`transition-opacity ${showPreview ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
          <p className="text-sm font-medium mb-4 text-primary">Preview de Visualização:</p>
          <ToolPreview data={formData} />
        </div>
      </div>
    </div>
  )
}