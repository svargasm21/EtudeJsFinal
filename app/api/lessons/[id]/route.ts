import { db } from "@/lib/db"
import { v2 as cloudinary } from "cloudinary"
import { unlink, writeFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { join } from "path"

const JWT_SECRET = process.env.JWT_SECRET || "tu-clave-secreta"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(
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
        cursos: {
          include: {
            lecciones: true,
          },
        },
      },
    })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Upload Video
    const data = await request.formData()
    const video = data.get("video") as File
    if (!video) {
      return NextResponse.json({ error: "No video provided" }, { status: 400 })
    }

    const bytes = await video.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save video
    const filepath = join(process.cwd(), "public/tmp", video.name)
    writeFile(filepath, buffer)

    // Upload to cloudinary
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "video",
    })

    // Delete temp file
    if (filepath) {
      try {
        await unlink(filepath)
        console.log(`Archivo temporal eliminado: ${filepath}`)
      } catch (unlinkError) {
        console.error(
          `Error al eliminar el archivo temporal ${filepath}:`,
          unlinkError
        )
      }
    }

    // Update lesson
    const { id } = params
    const lessonId = parseInt(id, 10)

    if (isNaN(lessonId)) {
      return NextResponse.json(
        { message: "El ID de la lección debe ser un número." },
        { status: 400 }
      )
    }

    const lessonToUpdate = user.cursos.find((curso) =>
      curso.lecciones.some((leccion) => leccion.id === lessonId)
    )
    if (!lessonToUpdate) {
      return NextResponse.json(
        { error: "La lección no existe." },
        { status: 404 }
      )
    }

    const lesson = await db.leccion.update({
      where: { id: lessonId },
      data: {
        videoUrl: response.secure_url,
      },
    })

    return NextResponse.json(lesson, { status: 200 })
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
