"use client"

import { useState } from "react"

const Lesson = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    if (file) {
      formData.append("video", file)
    }

    const response = await fetch(`/api/lessons/${id}`, {
      method: "POST",
      body: formData,
    })

    const data = await response.json()
  }
  return (
    <div className="max-w-7xl mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button>Upload</button>
      </form>
    </div>
  )
}

export default Lesson
