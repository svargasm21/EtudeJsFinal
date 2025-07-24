import { db } from "@/lib/db"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const JWT_SECRET = process.env.JWT_SECRET || "tu-clave-secreta"

const createCourseSchema = z.object({
  title: z.string().min(1, "El título es requerido.").max(200),
  description: z.string().optional(),
  difficulty: z.string().max(50).optional(),
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
      },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()

    const validation = createCourseSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      )
    }
    const { title, description, difficulty } = validation.data

    const newCourse = await db.curso.create({
      data: {
        titulo: title,
        descripcion: description,
        dificultad: difficulty,
        fechaCreacion: new Date(),
        usuario: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    return NextResponse.json(newCourse, { status: 201 })
  } catch (error) {
    console.log(error)
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

export async function GET(request: NextRequest) {
  try {
    const courses = await db.curso.findMany({
      include: {
        usuario: true,
      },
    })
    return NextResponse.json(courses, { status: 201 })
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
