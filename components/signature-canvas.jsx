"use client"

import { useRef, useState } from "react"
import SignatureCanvas from "react-signature-canvas"

export default function SignatureComponent({ onChange }) {
  const sigCanvas = useRef(null)
  const [isSigned, setIsSigned] = useState(false)

  const clear = () => {
    sigCanvas.current.clear()
    setIsSigned(false)
    onChange(null)
  }

  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature")
      return
    }

    const dataURL = sigCanvas.current.toDataURL("image/png")
    onChange(dataURL)
    setIsSigned(true)
  }

  return (
    <div className="border rounded-lg p-2">
      <div className="border-b pb-2 mb-2">
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: "w-full h-40 border rounded",
          }}
          onEnd={() => setIsSigned(true)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={clear}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={save}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!isSigned}
        >
          Save Signature
        </button>
      </div>
    </div>
  )
}

