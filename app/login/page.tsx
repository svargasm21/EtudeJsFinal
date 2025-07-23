'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Music, Piano, Headphones } from 'lucide-react'

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
          setMensaje('Email no registrado. Cambia a "Registrarse" para crear cuenta.')
        } else {
          setMensaje(data.error ?? 'Error desconocido')
        }
      } else {
        setMensaje(data.message ?? 'Operación exitosa')
        if (modo === 'login') {
          window.location.href = '/dashboard'
        } else {
          setModo('login')
        }
      }
    } catch {
      setMensaje('Error de red, inténtalo de nuevo.')
    }
  }

  return (
    <main className="min-h-screen relative flex flex-col lg:flex-row overflow-hidden">
      {/* Background con gradientes y elementos flotantes */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-blue-500/10" />
      
      {/* Elementos decorativos flotantes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-32 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-green-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

      {/* Panel izquierdo - Branding y presentación */}
      <div className="relative z-10 lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 text-white">
        {/* Botón de regreso */}
        <div className="absolute top-6 left-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-300 transition-all duration-300 group"
          >
            <div className="transform group-hover:-translate-x-1 transition-transform duration-300">←</div>
            <span className="text-sm">Volver al Inicio</span>
          </Link>
        </div>

        <div className="max-w-md text-center lg:text-left space-y-8 animate-fadeInUp">
          {/* Logo y título principal */}
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center backdrop-blur-lg border border-yellow-400/30">
                <span className="text-yellow-400 font-bold text-2xl">E</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  EtudeJS
                </h1>
                <p className="text-gray-400 text-sm">Tu academia musical digital</p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-yellow-200 to-blue-200 bg-clip-text text-transparent">
                Domina el arte del 
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                piano digital
              </span>
            </h2>
          </div>

          {/* Características principales */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Piano className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">Piano Interactivo</h3>
                <p className="text-gray-400 text-sm">Practica con nuestro piano virtual avanzado</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Music className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-green-200 transition-colors">Cursos Estructurados</h3>
                <p className="text-gray-400 text-sm">Desde principiante hasta nivel avanzado</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-purple-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Headphones className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors">Seguimiento Personal</h3>
                <p className="text-gray-400 text-sm">Monitorea tu progreso y logros</p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="flex justify-center lg:justify-start gap-8 pt-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-300">500+</div>
              <div className="text-xs text-gray-400">Estudiantes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">50+</div>
              <div className="text-xs text-gray-400">Lecciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">4.9</div>
              <div className="text-xs text-gray-400">Rating ⭐</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho - Formulario de autenticación */}
      <div className="relative z-10 lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md animate-scaleIn">
          {/* Mensaje de estado */}
          {mensaje && (
            <div className={`mb-6 p-4 rounded-2xl backdrop-blur-lg border text-sm animate-fadeInUp ${
              mensaje.includes('Error') || mensaje.includes('no registrado')
                ? 'bg-red-500/10 border-red-400/20 text-red-300'
                : 'bg-green-500/10 border-green-400/20 text-green-300'
            }`}>
              {mensaje}
            </div>
          )}

          {/* Formulario principal */}
          <div className="stats-card p-8 rounded-3xl">
            {/* Tabs de navegación */}
            <div className="flex mb-8 bg-gray-800/50 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => {
                  setModo('login')
                  setMensaje(null)
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  modo === 'login'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setModo('registro')
                  setMensaje(null)
                }}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  modo === 'registro'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                Registrarse
              </button>
            </div>

            {/* Título del formulario */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                {modo === 'login' ? '¡Bienvenido de vuelta!' : '¡Únete a nosotros!'} 🎹
              </h3>
              <p className="text-gray-400 text-sm">
                {modo === 'login' 
                  ? 'Ingresa tus credenciales para continuar tu aprendizaje' 
                  : 'Crea tu cuenta y comienza tu viaje musical'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo nombre (solo registro) */}
              {modo === 'registro' && (
                <div className="animate-fadeInUp">
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-2xl bg-gray-800/50 text-white border border-gray-600/50 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Tu nombre completo"
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

              {/* Campo email */}
              <div className="animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  className="w-full p-4 rounded-2xl bg-gray-800/50 text-white border border-gray-600/50 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="tu@email.com"
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

              {/* Campo contraseña */}
              <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={verClave ? 'text' : 'password'}
                    className="w-full p-4 pr-12 rounded-2xl bg-gray-800/50 text-white border border-gray-600/50 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="Tu contraseña segura"
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
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                    tabIndex={-1}
                  >
                    {verClave ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {modo === 'registro' && (
                  <p className="text-xs text-gray-500 mt-2">
                    Mín. 6 caracteres, incluye mayúscula, minúscula, número y símbolo
                  </p>
                )}
              </div>

              {/* Botón de envío */}
              <div className="animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <button
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] shadow-lg ${
                    modo === 'login'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-yellow-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-blue-500/25'
                  }`}
                >
                  {modo === 'login' ? '🎹 Iniciar Sesión' : '🚀 Crear Cuenta'}
                </button>
              </div>
            </form>

            {/* Enlaces adicionales */}
            <div className="mt-8 text-center animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              <p className="text-gray-400 text-sm">
                {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                <button
                  type="button"
                  onClick={() => {
                    setModo(modo === 'login' ? 'registro' : 'login')
                    setMensaje(null)
                  }}
                  className="ml-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300"
                >
                  {modo === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
