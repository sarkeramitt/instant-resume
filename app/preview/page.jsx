"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import ResumePreview from "@/components/resume-preview"
import { templates } from "@/lib/templates"

// Dynamically import PDF components with SSR disabled
const PDFDownloadButton = dynamic(() => import("@/components/pdf-download-button"), { ssr: false })

export default function Preview() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get resume data from localStorage
    const data = localStorage.getItem("resumeData")
    if (data) {
      setResumeData(JSON.parse(data))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl mb-4">No resume data found.</p>
        <button
          onClick={() => router.push("/builder")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create a Resume
        </button>
      </div>
    )
  }

  const template = templates.find((t) => t.id === resumeData.template)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume Preview</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/builder")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
          >
            Edit Resume
          </button>
          <PDFDownloadButton template={template} data={resumeData.data} />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        <div className="bg-white shadow-lg max-w-4xl mx-auto">
          <ResumePreview template={template} data={resumeData.data} />
        </div>
      </div>
    </div>
  )
}

