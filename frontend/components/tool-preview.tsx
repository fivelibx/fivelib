"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink, Code2 } from "lucide-react"

export function ToolPreview({ data }: { data: any }) {
  return (
    <Card className="group border-border bg-card hover:border-primary/50 transition-all">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-primary">
            {data.linguagem || "Linguagem"}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span className="text-xs">{data.stars || 0}</span>
          </div>
        </div>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Code2 className="h-5 w-5 text-primary" />
          {data.nome || "Nome da Ferramenta"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {data.descricao || "A descrição da ferramenta aparecerá aqui..."}
        </p>
        <div className="flex flex-wrap gap-2">
          {(data.tags || ["tag1", "tag2"]).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}