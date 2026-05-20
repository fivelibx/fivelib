"use client"

import * as React from 'react'
import { Star, Heart, ExternalLink, BookOpen } from 'lucide-react'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Tool } from "@/services/api"
import { useAuth } from '@/hooks/use-auth'

// ==========================================
// COMPONENTES ESTRUTURAIS DO CARD (UI Pura)
// ==========================================

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'border border-border bg-card rounded-lg flex flex-col justify-between transition-all hover:border-primary/50 hover:ring-1 hover:ring-primary/50',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold tracking-tight text-foreground', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
}

export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

// ==========================================
// COMPONENTE DE REGRA DE NEGÓCIO (ToolCard)
// ==========================================

export function ToolCard({ tool, initialFavorite = false }: { tool: Tool, initialFavorite?: boolean }) {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [stars, setStars] = useState(tool.stars)
  const [hasStarred, setHasStarred] = useState(() => {
    if (typeof window !== "undefined") {
      const localStars = JSON.parse(localStorage.getItem("fivelib_stars") || "{}")
      return !!localStars[tool.id]
    }
    return false
  })

  useEffect(() => {
    setIsFavorite(initialFavorite)
  }, [initialFavorite])

  const handleToggleStar = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      router.push('/login')
      return
    }

    const nextHasStarred = !hasStarred
    const previousStars = stars

    setStars(prev => nextHasStarred ? prev + 1 : Math.max(0, prev - 1))
    setHasStarred(nextHasStarred)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
      
      await fetch(`${baseUrl}/resources/${tool.id}/star`, {
        method: nextHasStarred ? "PATCH" : "DELETE",
        headers: { "Content-Type": "application/json" }
      })

      const localStars = JSON.parse(localStorage.getItem("fivelib_stars") || "{}")
      if (nextHasStarred) {
        localStars[tool.id] = true
      } else {
        delete localStars[tool.id]
      }
      localStorage.setItem("fivelib_stars", JSON.stringify(localStars))
    } catch (error) {
      setStars(previousStars)
      setHasStarred(!nextHasStarred)
    }
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    
    const next = !isFavorite
    setIsFavorite(next)

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

      await fetch(`${baseUrl}/usuarios/me/favorites${next ? "" : `/${tool.id}`}`, {
        method: next ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: next ? JSON.stringify({ ferramenta_id: tool.id }) : null
      })
    } catch (error) {
      setIsFavorite(!next)
    }
  }

  return (
    <Card>
      <div className="p-5 flex flex-col h-full justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  {tool.nome}
                </h3>
                <p className="text-xs text-primary font-medium mt-0.5">{tool.linguagem}</p>
              </div>
            </div>

            <button 
              onClick={handleToggleFavorite}
              className={cn(
                "h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors text-muted-foreground hover:bg-secondary/50",
                isFavorite && "text-destructive"
              )}
            >
              <Heart 
                size={18} 
                className={cn(
                  "transition-all",
                  isFavorite ? "fill-[#ff4b4b] text-[#ff4b4b] scale-110" : "text-muted-foreground"
                )} 
              />
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
            {tool.descricao}
          </p>
          
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tool.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-[#2a2a2a] px-2 py-0.5 text-[10px] text-muted-foreground border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/60">
          <div 
            onClick={handleToggleStar}
            className="flex items-center gap-1.5 text-primary cursor-pointer transition-transform active:scale-95"
          >
            <Star 
              size={14} 
              className={cn(
                "transition-all", 
                hasStarred ? "fill-primary text-primary" : "fill-none text-muted-foreground"
              )} 
            />
            <span className="text-xs font-medium text-muted-foreground">
              {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium uppercase">
              {tool.categoria || "Global"}
            </span>
            <Link href={tool.url_oficial} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-1 text-xs text-primary font-medium hover:underline cursor-pointer">
                Docs <ExternalLink size={12} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}