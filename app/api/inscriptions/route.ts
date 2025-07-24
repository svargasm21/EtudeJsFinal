import { db } from "@/lib/db"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const JWT_SECRET = process.env.JWT_SECRET || "tu-clave-secreta"

const createInscriptionSchema = z.object({
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
      },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await request.json()

    const validation = createInscriptionSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.format() },
        { status: 400 }
      )
    }
    const { courseId } = validation.data

    const newInscription = await db.inscripcion.create({
      data: {
        curso: {
          connect: {
            id: courseId,
          },
        },
        usuario: {
          connect: {
            id: user.id,
          },
        },
      },
    })

    const newProgreso = await db.progreso.create({
      data: {
        inscripcion: {
          connect: {
            id: newInscription.id,
          },
        },
        porcentajeAvance: 0,
        ultimaActualizacion: new Date(),
      },
    })

    return NextResponse.json(
      { inscription: newInscription, progress: newProgreso },
      { status: 201 }
    )
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

export async function GET(request: NextRequest) {
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

    const inscriptions = user.inscripciones.map((inscription) => ({
      id: inscription.id,
      course: inscription.curso,
      progress: inscription.progreso,
      inscriptionDate: inscription.fechaInscripcion,
    }))

    return NextResponse.json(inscriptions, { status: 200 })
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
