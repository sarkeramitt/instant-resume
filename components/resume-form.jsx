"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"
import ImageUpload from "./image-upload"
import SignatureCanvas from "./signature-canvas"

export default function ResumeForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      personalInfo: {
        name: "",
        address: "",
        phone: "",
        email: "",
        github: "",
        portfolio: "",
        linkedin: "",
        profileImage: null,
        signature: null,
      },
      objective: "",
      skills: {
        expert: "",
        comfortable: "",
        familiar: "",
        tools: "",
        others: "",
      },
      experience: [{ title: "", company: "", location: "", startDate: "", endDate: "", description: "" }],
      projects: [{ title: "", liveLink: "", githubLink: "", description: "", technology: "" }],
      education: [{ degree: "", institution: "", location: "", year: "" }],
    },
  })

  const [profileImage, setProfileImage] = useState(null)
  const [signature, setSignature] = useState(null)

  const handleProfileImageUpload = (file) => {
    setProfileImage(file)
    setValue("personalInfo.profileImage", file)
  }

  const handleSignatureChange = (dataUrl) => {
    setSignature(dataUrl)
    setValue("personalInfo.signature", dataUrl)
  }

  // Dynamic fields handlers
  const addExperience = () => {
    const experiences = getValues("experience")
    setValue("experience", [
      ...experiences,
      { title: "", company: "", location: "", startDate: "", endDate: "", description: "" },
    ])
  }

  const removeExperience = (index) => {
    const experiences = getValues("experience")
    setValue(
      "experience",
      experiences.filter((_, i) => i !== index),
    )
  }

  const addProject = () => {
    const projects = getValues("projects")
    setValue("projects", [...projects, { title: "", liveLink: "", githubLink: "", description: "", technology: "" }])
  }

  const removeProject = (index) => {
    const projects = getValues("projects")
    setValue(
      "projects",
      projects.filter((_, i) => i !== index),
    )
  }

  const addEducation = () => {
    const education = getValues("education")
    setValue("education", [...education, { degree: "", institution: "", location: "", year: "" }])
  }

  const removeEducation = (index) => {
    const education = getValues("education")
    setValue(
      "education",
      education.filter((_, i) => i !== index),
    )
  }

  const experiences = watch("experience")
  const projects = watch("projects")
  const education = watch("education")

  const submitForm = (data) => {
    // Convert File objects to base64 strings for storage
    const processFormData = async () => {
      const formData = { ...data }

      // Convert profile image to base64 if it exists
      if (formData.personalInfo.profileImage instanceof File) {
        formData.personalInfo.profileImage = await fileToBase64(formData.personalInfo.profileImage)
      }

      onSubmit(formData)
    }

    processFormData()
  }

  // Helper function to convert File to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              {...register("personalInfo.name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.personalInfo?.name && (
              <p className="text-red-500 text-sm mt-1">{errors.personalInfo.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("personalInfo.email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.personalInfo?.email && (
              <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input {...register("personalInfo.phone")} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input {...register("personalInfo.address")} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GitHub</label>
            <input
              {...register("personalInfo.github")}
              className="w-full p-2 border rounded"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Portfolio</label>
            <input
              {...register("personalInfo.portfolio")}
              className="w-full p-2 border rounded"
              placeholder="https://yourportfolio.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              {...register("personalInfo.linkedin")}
              className="w-full p-2 border rounded"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Image</label>
            <ImageUpload onUpload={handleProfileImageUpload} />
            {profileImage && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(profileImage) || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Signature</label>
            <SignatureCanvas onChange={handleSignatureChange} />
            {signature && (
              <div className="mt-2">
                <img
                  src={signature || "/placeholder.svg"}
                  alt="Signature Preview"
                  className="h-16 border rounded p-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Career Objective</h2>
        <textarea
          {...register("objective")}
          className="w-full p-2 border rounded h-32"
          placeholder="Write a brief summary of your career goals and qualifications..."
        ></textarea>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Expert In</label>
            <input
              {...register("skills.expert")}
              className="w-full p-2 border rounded"
              placeholder="JavaScript, React, Node.js, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Comfortable With</label>
            <input
              {...register("skills.comfortable")}
              className="w-full p-2 border rounded"
              placeholder="Next.js, TypeScript, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Familiar With</label>
            <input
              {...register("skills.familiar")}
              className="w-full p-2 border rounded"
              placeholder="MongoDB, GraphQL, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tools</label>
            <input
              {...register("skills.tools")}
              className="w-full p-2 border rounded"
              placeholder="Git, VS Code, Docker, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Other Skills</label>
            <input
              {...register("skills.others")}
              className="w-full p-2 border rounded"
              placeholder="Microsoft Office, Photoshop, etc."
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <button type="button" onClick={addExperience} className="flex items-center text-blue-600 hover:text-blue-800">
            <Plus size={16} className="mr-1" /> Add Experience
          </button>
        </div>

        {experiences.map((_, index) => (
          <div key={index} className="p-4 border rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Experience {index + 1}</h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input {...register(`experience.${index}.title`)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input {...register(`experience.${index}.company`)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input {...register(`experience.${index}.location`)} className="w-full p-2 border rounded" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    {...register(`experience.${index}.startDate`)}
                    className="w-full p-2 border rounded"
                    placeholder="MM/YYYY"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    {...register(`experience.${index}.endDate`)}
                    className="w-full p-2 border rounded"
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  {...register(`experience.${index}.description`)}
                  className="w-full p-2 border rounded h-24"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Projects</h2>
          <button type="button" onClick={addProject} className="flex items-center text-blue-600 hover:text-blue-800">
            <Plus size={16} className="mr-1" /> Add Project
          </button>
        </div>

        {projects.map((_, index) => (
          <div key={index} className="p-4 border rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Project {index + 1}</h3>
              {index > 0 && (
                <button type="button" onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input {...register(`projects.${index}.title`)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Technology Used</label>
                <input
                  {...register(`projects.${index}.technology`)}
                  className="w-full p-2 border rounded"
                  placeholder="React, Node.js, MongoDB, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Live Link</label>
                <input
                  {...register(`projects.${index}.liveLink`)}
                  className="w-full p-2 border rounded"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GitHub Link</label>
                <input
                  {...register(`projects.${index}.githubLink`)}
                  className="w-full p-2 border rounded"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  {...register(`projects.${index}.description`)}
                  className="w-full p-2 border rounded h-24"
                ></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          <button type="button" onClick={addEducation} className="flex items-center text-blue-600 hover:text-blue-800">
            <Plus size={16} className="mr-1" /> Add Education
          </button>
        </div>

        {education.map((_, index) => (
          <div key={index} className="p-4 border rounded-lg mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Education {index + 1}</h3>
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Degree/Certificate</label>
                <input {...register(`education.${index}.degree`)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <input {...register(`education.${index}.institution`)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input {...register(`education.${index}.location`)} className="w-full p-2 border rounded" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  {...register(`education.${index}.year`)}
                  className="w-full p-2 border rounded"
                  placeholder="2020 - 2024"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Preview Resume
        </button>
      </div>
    </form>
  )
}

