'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [verClave, setVerClave] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMensaje(null)

    const ruta = modo === 'login' ? '/api/auth/login' : '/api/auth/register'
    const payload =
      modo === 'login'
        ? { correo, contrasena }
        : { nombre, correo, contrasena }

    try {
      const res = await fetch(ruta, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        if (
          modo === 'login' &&
          data.error?.toLowerCase().includes('no encontrado')
        ) {
          setMensaje('Email no registrado. Cambia a "Sign in" para crear cuenta.')
        } else {
          setMensaje(data.error ?? 'Error desconocido')
        }
      } else {
        setMensaje(data.message ?? 'Operación exitosa')
        if (modo === 'login') {
          window.location.href = '/courses'
        } else {
          setModo('login')
        }
      }
    } catch {
      setMensaje('Error de red, inténtalo de nuevo.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center text-white p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="text-gray-400 hover:text-white">
          ← Home
        </Link>
      </div>

      {mensaje && (
        <div className="mb-4 p-2 bg-yellow-700 text-yellow-100 rounded">
          {mensaje}
        </div>
      )}

      <div className="bg-black/70 backdrop-blur-md shadow-lg p-8 rounded-lg w-full max-w-sm border border-gray-700">
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={() => {
              setModo('login')
              setMensaje(null)
            }}
            className={`w-1/2 py-2 font-semibold ${
              modo === 'login'
                ? 'border-b-2 border-white'
                : 'text-gray-400'
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => {
              setModo('registro')
              setMensaje(null)
            }}
            className={`w-1/2 py-2 font-semibold ${
              modo === 'registro'
                ? 'border-b-2 border-white'
                : 'text-gray-400'
            }`}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {modo === 'registro' && (
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity(
                    'El nombre es obligatorio.'
                  )
                }
                onInput={(e) =>
                  e.currentTarget.setCustomValidity('')
                }
                title="Introduce tu nombre completo."
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
              title="Introduce un email válido, p.ej. usuario@dominio.com"
              onInvalid={(e) =>
                e.currentTarget.setCustomValidity(
                  'La dirección debe tener formato usuario@dominio.com'
                )
              }
              onInput={(e) =>
                e.currentTarget.setCustomValidity('')
              }
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <div className="relative">
              <input
                type={verClave ? 'text' : 'password'}
                className="w-full p-2 pr-10 rounded bg-gray-800 text-white border border-gray-600"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$"
                title="Debe tener al menos una mayúscula, una minúscula, un número, un símbolo y 6 caracteres mínimo."
                onInvalid={(e) =>
                  e.currentTarget.setCustomValidity(
                    'Debe tener al menos una mayúscula, una minúscula, un número, un símbolo y 6 caracteres mínimo.'
                  )
                }
                onInput={(e) =>
                  e.currentTarget.setCustomValidity('')
                }
              />
              <button
                type="button"
                onClick={() => setVerClave(!verClave)}
                className="absolute right-2 top-2 text-gray-400 hover:text-white"
                tabIndex={-1}
              >
                {verClave ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
          >
            {modo === 'login' ? 'Log in' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}
