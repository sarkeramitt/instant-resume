"use client"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

export default function ImageUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      onUpload(file)
    } else {
      alert("Please upload an image file")
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileInput} accept="image/*" className="hidden" />
      <Upload className="mx-auto h-8 w-8 text-gray-400" />
      <p className="mt-2 text-sm text-gray-500">Drag and drop an image, or click to browse</p>
    </div>
  )
}

