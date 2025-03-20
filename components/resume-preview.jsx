"use client"

import { useEffect, useState } from "react"
import ClassicTemplate from "@/components/templates/classic-template"
import ModernTemplate from "@/components/templates/modern-template"
import MinimalTemplate from "@/components/templates/minimal-template"

export default function ResumePreview({ template, data }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const TemplateComponent =
    {
      classic: ClassicTemplate,
      modern: ModernTemplate,
      minimal: MinimalTemplate,
    }[template.id] || ClassicTemplate

  return <TemplateComponent data={data} />
}

