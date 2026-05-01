"use client" //

import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}
import { Star, Heart, ExternalLink, BookOpen } from 'lucide-react'
import Link from "next/link"
import { api, Tool } from "@/services/api"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function ToolCard({ tool }: { tool: Tool }) {
  const router = useRouter()
  const user = null 

  const [isFavorite, setIsFavorite] = useState(false)
  const [stars, setStars] = useState(tool.stars)
  const [hasStarred, setHasStarred] = useState(false)

  // -- estrela --
  const handleToggleStar = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push('/login')
      return
    }

    if (!hasStarred) {
      setStars(prev => prev + 1)
      setHasStarred(true)
      try {
        await api.incrementStar(tool.id)
      } catch (error) {
        setStars(prev => prev - 1)
        setHasStarred(false)
      }
    } else {
      setStars(prev => prev - 1)
      setHasStarred(false)
    }
  }

  // -- favorito --
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      router.push('/login')
      return
    }
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="group relative border-border bg-card transition-all hover:border-primary/50 hover:ring-1 hover:ring-primary/50">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {tool.nome}
            </h3>
            <p className="text-xs text-muted-foreground">{tool.linguagem}</p>
          </div>
        </div>
        <CardAction>
          <button 
            onClick={handleToggleFavorite}
            className={cn(
              "p-2 rounded-lg transition-all",
              "hover:bg-primary hover:text-black" // fundo verde e ícone preto no hover
            )}
          >
            <Heart 
              size={20} 
              className={cn(
                "transition-all",
                isFavorite ? "fill-[#ff4b4b] text-[#ff4b4b] scale-110" : "text-muted-foreground"
              )} 
            />
          </button>
        </CardAction>
      </CardHeader>

      <CardContent className="pt-4">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {tool.descricao}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tool.tags?.map((tag) => (
            <span key={tag} className="rounded-md bg-[#2a2a2a] px-2 py-1 text-[10px] text-muted-foreground border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-2">
        <div 
          onClick={handleToggleStar}
          className="flex items-center gap-1.5 text-primary cursor-pointer transition-transform active:scale-95"
        >
          <Star size={16} className={cn(hasStarred ? "fill-primary" : "fill-none")} />
          <span className="text-xs font-medium text-muted-foreground">
            {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-md border border-border bg-secondary/30 px-2 py-0.5 text-[10px] text-muted-foreground uppercase">
            {tool.categoria}
          </span>
          <Link href={tool.url_oficial} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium cursor-pointer">
              Docs <ExternalLink size={12} />
            </div>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  ToolCard,
}