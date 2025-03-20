"use client"

import { Check } from "lucide-react"

export default function TemplateSelector({ templates, selectedTemplate, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
            selectedTemplate === template.id ? "ring-2 ring-blue-500 shadow-lg" : "hover:shadow-md"
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div className="relative">
            <img
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              className="w-full h-64 object-cover"
            />
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                <Check size={16} />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
          <div className="px-4 pb-4">
            <button
              type="button"
              className={`w-full py-2 rounded text-sm font-medium ${
                selectedTemplate === template.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => onSelect(template.id)}
            >
              {selectedTemplate === template.id ? "Selected" : "Use This Template"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

