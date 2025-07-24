"use client"

import { useEffect, useState } from "react"

interface User {
  id: number
  nombre: string
  correo: string
  fechaRegistro: string
  inscripciones?: {
    id: number
    curso: any
    progreso?: {
      porcentajeAvance: number
    }
  }[]
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        setUser(null)
        // Opcional: redirigir a la página de login
        window.location.href = "/login"
      } else {
        console.error("Error al cerrar sesión")
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Crear un controller para timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 segundos timeout

        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          const errorData = await response.text()
          setUser(null)
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
        if (error instanceof Error && error.name === "AbortError") {
          console.error("Request timed out")
        }
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading, isAuthenticated: !!user, logout }
}
