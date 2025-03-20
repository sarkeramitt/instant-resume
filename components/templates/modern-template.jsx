"use client"

export default function ModernTemplate({ data }) {
  return (
    <div className="flex flex-col min-h-full">
      <header className="bg-gray-900 text-white p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {data.personalInfo.profileImage && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <img
                src={
                  typeof data.personalInfo.profileImage === "object"
                    ? URL.createObjectURL(data.personalInfo.profileImage)
                    : data.personalInfo.profileImage || "/placeholder.svg"
                }
                alt={data.personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{data.personalInfo.name}</h1>
            {data.objective && <p className="mt-2 max-w-2xl text-gray-300">{data.objective}</p>}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
        <div className="md:col-span-1 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">Contact</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.address && (
                <p>
                  <span className="font-semibold">Address:</span> {data.personalInfo.address}
                </p>
              )}
              {data.personalInfo.phone && (
                <p>
                  <span className="font-semibold">Phone:</span> {data.personalInfo.phone}
                </p>
              )}
              {data.personalInfo.email && (
                <p>
                  <span className="font-semibold">Email:</span> {data.personalInfo.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">Links</h2>
            <div className="space-y-2 text-sm">
              {data.personalInfo.github && (
                <p>
                  <span className="font-semibold">GitHub:</span>{" "}
                  <a
                    href={data.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                  </a>
                </p>
              )}
              {data.personalInfo.portfolio && (
                <p>
                  <span className="font-semibold">Portfolio:</span>{" "}
                  <a
                    href={data.personalInfo.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </p>
              )}
              {data.personalInfo.linkedin && (
                <p>
                  <span className="font-semibold">LinkedIn:</span>{" "}
                  <a
                    href={data.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
            <div className="space-y-3 text-sm">
              {data.skills.expert && (
                <div>
                  <p className="font-semibold">Expert:</p>
                  <p>{data.skills.expert}</p>
                </div>
              )}
              {data.skills.comfortable && (
                <div>
                  <p className="font-semibold">Comfortable:</p>
                  <p>{data.skills.comfortable}</p>
                </div>
              )}
              {data.skills.familiar && (
                <div>
                  <p className="font-semibold">Familiar:</p>
                  <p>{data.skills.familiar}</p>
                </div>
              )}
              {data.skills.tools && (
                <div>
                  <p className="font-semibold">Tools:</p>
                  <p>{data.skills.tools}</p>
                </div>
              )}
              {data.skills.others && (
                <div>
                  <p className="font-semibold">Others:</p>
                  <p>{data.skills.others}</p>
                </div>
              )}
            </div>
          </div>

          {data.personalInfo.signature && (
            <div className="mt-6">
              <img src={data.personalInfo.signature || "/placeholder.svg"} alt="Signature" className="h-16" />
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          {data.experience && data.experience.length > 0 && data.experience[0].title && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">Experience</h2>
              <div className="space-y-5">
                {data.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4">
                    <h3 className="text-lg font-semibold">{exp.title}</h3>
                    <p className="text-sm font-medium">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-sm text-gray-600">
                        {exp.startDate}
                        {exp.endDate ? ` to ${exp.endDate}` : ""}
                      </p>
                    )}
                    {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.projects && data.projects.length > 0 && data.projects[0].title && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">Projects</h2>
              <div className="space-y-5">
                {data.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.technology && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Technology:</span> {project.technology}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm my-1">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Live
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                    {project.description && <p className="text-sm mt-1">{project.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education && data.education.length > 0 && data.education[0].degree && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-gray-300 pl-4">
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    <p className="text-sm">
                      {edu.institution}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>
                    {edu.year && <p className="text-sm text-gray-600">{edu.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

