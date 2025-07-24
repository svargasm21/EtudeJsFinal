"use client"

import { useState } from "react"

interface Course {
  titulo: string
  descripcion: string
  fechaCreacion: string
}

const Course = () => {
  const [course, setCourse] = useState<Course | null>(null)
  return <div className="max-w-7xl mx-auto px-4"></div>
}

export default Course
