"use client"

import { useAuth } from "@/app/hooks/useAuth"
import CourseCover from "@/components/ui/CourseCover"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button"
import BookList from "../../../components/ui/CourseList"

const Courses = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData)

    const res1 = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const data1 = await res1.json()

    if (!res1.ok) {
      toast("Ha ocurrido un error")
      return
    }

    const res2 = await fetch("/api/inscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: data1.id,
      }),
    })

    if (!res2.ok) {
      toast("Ha ocurrido un error")
      return
    } else {
      redirect(`/courses/${data1.id}`)
    }
  }

  const handleInscription = async (id: number) => {
    const res = await fetch(`/api/inscriptions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: id,
      }),
    })
    if (!res.ok) {
      toast("Ha ocurrido un error")
      return
    } else {
      redirect(`/courses/${id}`)
    }
  }
  console.log(user)
  console.log(courses)

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`/api/courses/`)
      if (!res.ok) {
        toast("Ocurrio un error")
      }

      const data = await res.json()
      setCourses(data)
      setIsLoading(false)
    }
    fetchCourses()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 via-yellow-400/10 to-transparent rounded-3xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-6">
                Mis Cursos
              </h1>
              <p className="text-gray-300 text-xl leading-relaxed mb-8">
                Continúa tu aprendizaje musical con nuestros cursos interactivos
                diseñados para llevarte al siguiente nivel
              </p>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold px-8 py-3 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                      Crear mi propio curso
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Creación de curso</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="title">Titulo</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Mi nuevo curso"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Descripción</Label>
                          <Input
                            id="description"
                            name="description"
                            placeholder="Una descripción de tu curso"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end gap-4 mt-4">
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Crear</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/30 to-yellow-600/30 rounded-full blur-xl absolute -inset-4"></div>
                <div className="w-32 h-32 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl border border-yellow-400/30 flex items-center justify-center relative">
                  <img
                    src="/icons/book.svg"
                    alt="Courses"
                    className="w-16 h-16 brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="bg-gradient-to-br from-green-600/20 to-green-500/20 backdrop-blur-sm border border-green-400/20 rounded-xl p-6 text-center hover:border-green-400/40 transition-all duration-300 group">
          <div className="text-3xl font-bold text-green-300 mb-2 group-hover:scale-110 transition-transform duration-300">
            {user ? user?.inscripciones?.length : "..."}
          </div>
          <p className="text-gray-400">Cursos inscritos</p>
        </div>
      </div>

      {/* Cursos en Progreso */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-yellow-200 mb-2 flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></span>
              Continuar Aprendiendo
            </h2>
            <p className="text-gray-400">Cursos que tienes en progreso</p>
          </div>
        </div>

        {user && user.inscripciones && user.inscripciones.length !== 0 ? (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-transparent rounded-2xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-green-400/20 rounded-2xl p-6">
              <BookList
                title=""
                courses={user.inscripciones.map((i) => ({
                  id: i.curso.id,
                  title: i.curso.titulo,
                  progress: i.progreso?.porcentajeAvance,
                  image: i.curso.imagen,
                  author: i.curso.autor,
                  coverColor: i.curso.colorPortada,
                  description: i.curso.descripcion,
                  coverUrl: i.curso.imagen,
                  genre: i.curso.usuario.nombre,
                  rating: i.curso.calificacion,
                  summary: i.curso.sobre,
                  totalCopies: i.curso.cantidadCopias,
                }))}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-gray-600/20 rounded-2xl p-12 text-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto border border-gray-500/20">
                <img
                  src="/images/no-books.png"
                  alt="No courses"
                  className="w-12 h-12 opacity-50"
                />
              </div>
              <div className="absolute -inset-4 bg-gray-600/20 rounded-full blur-lg -z-10"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-3">
              No tienes cursos en progreso
            </h3>
            <p className="text-gray-500 mb-6">
              ¡Comienza tu viaje musical explorando nuestros cursos disponibles!
            </p>
            <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold">
              Explorar Cursos
            </Button>
          </div>
        )}
      </section>

      {/* Cursos Disponibles */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-yellow-200 mb-2 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-4"></span>
              Explora Nuevos Cursos
            </h2>
            <p className="text-gray-400">Amplía tus conocimientos musicales</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6">
            <section>
              <ul className="mt-10 flex flex-wrap gap-5 max-xs:justify-between xs:gap-10">
                {courses &&
                  courses.map((c: any) => (
                    <li className="xs:w-52" key={c.id}>
                      <CourseCover
                        coverColor={c.colorPortada}
                        coverImage={c.imagen}
                      />
                      <div className={"mt-4"}>
                        <p className="mt-2 line-clamp-1 text-base font-semibold text-white xs:text-xl w-40 overflow-hidden whitespace-nowrap text-ellipsis">
                          {c.titulo}
                        </p>
                        <p
                          className="mt-1 line-clamp-1 text-sm italic text-light-100 xs:text-base"
                          style={{ color: "#e7dfcf" }}
                        >
                          {c.usuario.nombre}
                        </p>
                      </div>
                      {user &&
                      user?.inscripciones?.find((i) => i.curso.id == c.id) ? (
                        <Button className="mt-2 bg-gray-600">Inscrito</Button>
                      ) : (
                        <Button
                          className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold mt-2"
                          onClick={() => handleInscription(c.id)}
                        >
                          Inscribir
                        </Button>
                      )}
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-200 mb-4">
            🎯 Recomendado para ti
          </h3>
          <p className="text-gray-300 mb-6">
            Basado en tu progreso, te recomendamos continuar con cursos de
            teoría musical avanzada
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-full border border-purple-400/30 text-sm">
              Armonía Musical
            </span>
            <span className="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-full border border-purple-400/30 text-sm">
              Composición
            </span>
            <span className="px-4 py-2 bg-purple-600/30 text-purple-200 rounded-full border border-purple-400/30 text-sm">
              Análisis Musical
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses
