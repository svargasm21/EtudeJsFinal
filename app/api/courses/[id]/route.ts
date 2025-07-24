import { db } from "@/lib/db"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "tu-clave-secreta"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { id } = params
    const courseId = parseInt(id, 10)

    if (isNaN(courseId)) {
      return NextResponse.json(
        { message: "El ID del curso debe ser un número." },
        { status: 400 }
      )
    }

    const courseToDelete = user.cursos.find((course) => course.id === courseId)
    if (!courseToDelete) {
      return NextResponse.json(
        { message: "Curso no encontrado." },
        { status: 404 }
      )
    }

    const deletedCourse = await db.curso.delete({
      where: {
        id: courseId,
      },
    })

    return NextResponse.json(deletedCourse, { status: 200 })
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
