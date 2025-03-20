"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ResumeForm from "@/components/resume-form"
import TemplateSelector from "@/components/template-selector"
import { templates } from "@/lib/templates"

export default function Builder() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id)
  const [step, setStep] = useState("template") // 'template' or 'form'

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId)
    setStep("form")
  }

  const handleFormSubmit = (formData) => {
    // Store form data in localStorage to access it in the preview page
    localStorage.setItem(
      "resumeData",
      JSON.stringify({
        template: selectedTemplate,
        data: formData,
      }),
    )

    router.push("/preview")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>

      {step === "template" ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Choose a Template</h2>
          <TemplateSelector templates={templates} selectedTemplate={selectedTemplate} onSelect={handleTemplateSelect} />
        </div>
      ) : (
        <div>
          <button
            onClick={() => setStep("template")}
            className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Templates
          </button>
          <ResumeForm onSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  )
}

