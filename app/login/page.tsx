'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [modo, setModo] = useState<'login' | 'registro'>('login')
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre, setNombre] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ruta = modo === 'login' ? '/api/login' : '/api/registro'

    const res = await fetch(ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena, nombre }),
    })

    const data = await res.json()
    if (res.ok) {
      alert(modo === 'login' ? 'Welcome' : 'User registered')
    } else {
      alert(data.message || 'Error')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center text-white">
      <div className="bg-black/70 backdrop-blur-md shadow-lg p-8 rounded-lg w-full max-w-sm border border-gray-700">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setModo('login')}
            className={`w-1/2 py-2 font-semibold ${
              modo === 'login' ? 'border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setModo('registro')}
            className={`w-1/2 py-2 font-semibold ${
              modo === 'registro' ? 'border-b-2 border-white' : 'text-gray-400'
            }`}
          >
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {modo === 'registro' && (
            <div className="mb-4">
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
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
