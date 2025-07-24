"use client"

import { Button } from "@/components/ui/button"
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
import { redirect, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Course = () => {
  const { id } = useParams()
  const [course, setCourse] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isAdmin = course?.curso.usuarioId === course?.usuarioId

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`/api/courses/${id}`)
      if (!res.ok) {
        toast("Al parecer no estas inscrito en este curso")
        redirect("/courses")
      }

      const data = await res.json()
      setCourse(data)
      setIsLoading(false)
    }
    fetchCourse()
  }, [])

  const handleDelete = async () => {
    const res = await fetch(`/api/courses/${course?.curso.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      toast("Ha ocurrido un error")
      return
    } else {
      redirect("/courses/")
    }
  }

  const handleDeleteLesson = async (lessonId: number) => {
    const res = await fetch(`/api/lessons/${lessonId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      toast("Ha ocurrido un error")
      return
    } else {
      toast("Lección eliminada con exito")
    }
  }

  const handleDeleteInscription = async () => {
    const res = await fetch(`/api/inscriptions/${course?.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!res.ok) {
      toast("Ha ocurrido un error")
      return
    } else {
      redirect("/courses/")
    }
  }

  console.log(course)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData)

    const res1 = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: body.title,
        description: body.description,
        courseId: course?.curso.id,
      }),
    })
    const data1 = await res1.json()
    if (!res1.ok) {
      toast("Ha ocurrido un error")
      return
    }
    setTimeout(() => {
      const uploadVideo = async () => {
        const formData2 = new FormData()
        if (body.videoUrl) {
          formData2.append("video", body.videoUrl)
        }

        const res2 = await fetch(`/api/lessons/${data1.id}`, {
          method: "POST",
          body: formData2,
        })

        if (!res2.ok) {
          toast("Ha ocurrido un error")
          return
        } else {
          toast("Lección creada con exito")
        }
      }
      uploadVideo()
    }, 1000)
  }

  return (
    <div>
      {isLoading && <p className="text-gray-300">Cargando...</p>}
      {!isLoading && course && (
        <div className="flex flex-col gap-8">
          <div className="lg:max-w-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-6">
              {course?.curso.titulo}
            </h1>
            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              {course?.curso.descripcion}
            </p>
            {isAdmin && (
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold px-8 py-3 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300">
                      Añadir lección
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Añadir lección</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="title">Titulo</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Lección N°1"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="description">Descripción</Label>
                          <Input
                            id="description"
                            name="description"
                            placeholder="Descripción de la lección"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="videoUrl">Video</Label>
                          <Input id="videoUrl" name="videoUrl" type="file" />
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-yellow-400/40 hover:bg-yellow-400/10 px-8 py-3"
                    >
                      Eliminar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>
                        ¿Estas seguro de eliminar este curso?
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-end gap-4 mt-4">
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <Button type="submit" onClick={handleDelete}>
                        Eliminar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  className="border-yellow-400/40 hover:bg-yellow-400/10 px-8 py-3"
                  onClick={handleDeleteInscription}
                >
                  Abandonar curso
                </Button>
              </div>
            )}
          </div>

          {course.curso.lecciones &&
            course.curso.lecciones.map((lesson: any) => (
              <div
                className="lg:max bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12"
                key={lesson.id}
              >
                <video
                  src={lesson.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="flex justify-between mt-8">
                  <div>
                    <h2 className="text-gray-300 text-2xl leading-relaxed">
                      {lesson.titulo}
                    </h2>
                    <p className="text-gray-300 text-xl leading-relaxed">
                      {lesson.descripcion}
                    </p>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="border-yellow-400/40 hover:bg-yellow-400/10 px-8 py-3"
                        >
                          Eliminar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            ¿Estas seguro de eliminar esta lección?
                          </DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center justify-end gap-4 mt-4">
                          <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            onClick={() => handleDeleteLesson(lesson.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Course
