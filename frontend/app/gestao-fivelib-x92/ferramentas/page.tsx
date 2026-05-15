"use client"

import { useState } from "react"
import { ToolPreview } from "@/components/tool-preview"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Eye, Save } from "lucide-react"

export default function GestaoFerramentas() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    url_oficial: "",
    linguagem: "",
    stars: 0,
    tags: [] as string[]
  })

  const [showPreview, setShowPreview] = useState(true)

  const handleSalvar = async () => {
    const token = localStorage.getItem("access_token")
    const res = await fetch("http://localhost:8001/api/v1/tools/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
    
    if (res.ok) alert("Ferramenta cadastrada com sucesso!")
    else alert("Erro ao cadastrar. Verifique se você é admin.")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cadastrar Nova Ferramenta</h1>
        <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
          <Eye className="mr-2 h-4 w-4" /> {showPreview ? "Ocultar Preview" : "Mostrar Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 bg-card p-6 rounded-lg border border-border">
          <Input placeholder="Nome (Ex: FastAPI)" onChange={e => setFormData({...formData, nome: e.target.value})} />
          <Textarea placeholder="Descrição..." onChange={e => setFormData({...formData, descricao: e.target.value})} />
          <Input placeholder="URL Oficial" onChange={e => setFormData({...formData, url_oficial: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Linguagem" onChange={e => setFormData({...formData, linguagem: e.target.value})} />
            <Input type="number" placeholder="Stars" onChange={e => setFormData({...formData, stars: Number(e.target.value)})} />
          </div>
          <Input placeholder="Tags (separadas por vírgula)" onChange={e => setFormData({...formData, tags: e.target.value.split(",")})} />
          
          <Button className="w-full gap-2" onClick={handleSalvar}>
            <Save className="h-4 w-4" /> Salvar na FiveLib
          </Button>
        </div>

        {showPreview && (
          <div className="sticky top-8">
            <p className="text-xs font-mono text-muted-foreground mb-4 uppercase tracking-widest">Visualização no Site</p>
            <ToolPreview data={formData} />
          </div>
        )}
      </div>
    </div>
  )
}