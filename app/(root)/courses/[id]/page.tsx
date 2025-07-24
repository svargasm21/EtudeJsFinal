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
                    <Button
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-semibold px-8 py-3 shadow-lg hover:shadow-yellow-400/20 transition-all duration-300"
                      onClick={handleDelete}
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
                      <Button type="submit">Eliminar</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
          <div className="lg:max bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-12">
            <video
              src={course?.curso.video}
              controls
              className="w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Course
