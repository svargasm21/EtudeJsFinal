import { db } from "@/lib/db"
import { v2 as cloudinary } from "cloudinary"
import { writeFile } from "fs/promises"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { join } from "path"

const JWT_SECRET = process.env.JWT_SECRET || "tu-clave-secreta"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

    // Upload Video
    const data = await request.formData()
    const video = data.get("video") as File
    if (!video) {
      return NextResponse.json({ error: "No video provided" }, { status: 400 })
    }

    const bytes = await video.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Save video
    const filepath = join(process.cwd(), "public", video.name)
    writeFile(filepath, buffer)

    // Upload to cloudinary
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "video",
    })
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
