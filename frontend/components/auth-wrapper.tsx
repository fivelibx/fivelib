"use client"

import { useState, useEffect } from "react"
import { DemoNav } from "@/components/demo-nav"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <>
      {children}
      <DemoNav isLoggedIn={isLoggedIn} />
    </>
  )
}