"use client"

import { useState, useEffect } from "react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ResumePDF from "@/components/resume-pdf"

export default function PDFDownloadButton({ template, data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 opacity-50 cursor-not-allowed"
        disabled
      >
        Preparing PDF...
      </button>
    )
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF template={template} data={data} />}
      fileName={`${data.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {({ loading }) => (loading ? "Preparing PDF..." : "Download PDF")}
    </PDFDownloadLink>
  )
}

