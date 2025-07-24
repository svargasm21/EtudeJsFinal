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
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const { id } = params
    const inscriptionId = parseInt(id, 10)

    if (isNaN(inscriptionId)) {
      return NextResponse.json(
        { message: "El ID de inscripción debe ser un número." },
        { status: 400 }
      )
    }

    const inscriptionToDelete = user.inscripciones.find(
      (inscription) => inscription.id === inscriptionId
    )
    if (!inscriptionToDelete) {
      return NextResponse.json(
        { message: "Inscripción no encontrada." },
        { status: 404 }
      )
    }

    const inscription = await db.inscripcion.delete({
      where: {
        id: inscriptionId,
      },
    })

    return NextResponse.json(inscription, { status: 200 })
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
