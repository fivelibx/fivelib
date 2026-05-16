"use client"
import { useEffect, useState } from "react"

export function useAuth(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
        setIsLoggedIn(!!localStorage.getItem("access_token"))
    }, [])

    const getToken = () => localStorage.getItem("access_token")
    return {isLoggedIn, getToken}
}