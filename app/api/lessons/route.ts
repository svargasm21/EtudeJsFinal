import { db } from "@/lib/db"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const JWT_SECRET = process.env.JWT_SECRET || "tu-clave-secreta"

const createLessonSchema = z.object({
  title: z.string().min(1, "El título es requerido.").max(200),
  description: z.string().optional(),
  courseId: z.number().min(1, "El curso es requerido."),
})

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const payload = jwt.verify(token.value, JWT_SECRET) as {
      userId: number
    }

    const user = await db.usuario.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        nombre: true,
        correo: true,
        fechaRegistro: true,
        inscripciones: {
          include: {
            curso: true,
            progreso: true,
          },
        },
        cursos: true,
      },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()

    const validation = createLessonSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      )
    }
    const { title, description, courseId } = validation.data

    const course = user.cursos.find((course) => course.id === courseId)
    if (!course) {
      return NextResponse.json({ error: "El curso no existe" }, { status: 404 })
    }

    const newLesson = await db.leccion.create({
      data: {
        titulo: title,
        descripcion: description,
        fechaCreacion: new Date(),
        cursoId: courseId,
        videoUrl: "",
      },
    })

    return NextResponse.json(newLesson, { status: 201 })
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : String(error)
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    )
  }
}
