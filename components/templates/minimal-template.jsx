"use client"

export default function MinimalTemplate({ data }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.name}</h1>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mb-4">
          {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {data.personalInfo.github && (
            <a
              href={data.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {data.personalInfo.portfolio && (
            <a
              href={data.personalInfo.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Portfolio
            </a>
          )}
          {data.personalInfo.linkedin && (
            <a
              href={data.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
          )}
        </div>

        {data.personalInfo.profileImage && (
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden">
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
          </div>
        )}
      </header>

      {data.objective && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Career Objective</h2>
          <p className="text-sm">{data.objective}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {data.experience && data.experience.length > 0 && data.experience[0].title && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Experience</h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold">{exp.title}</h3>
                    <p className="text-sm">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </p>
                    {(exp.startDate || exp.endDate) && (
                      <p className="text-xs text-gray-600">
                        {exp.startDate}
                        {exp.endDate ? ` to ${exp.endDate}` : ""}
                      </p>
                    )}
                    {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.education && data.education.length > 0 && data.education[0].degree && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold">{edu.degree}</h3>
                    <p className="text-sm">
                      {edu.institution}
                      {edu.location ? `, ${edu.location}` : ""}
                    </p>
                    {edu.year && <p className="text-xs text-gray-600">{edu.year}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {data.projects && data.projects.length > 0 && data.projects[0].title && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-base font-semibold">{project.title}</h3>
                    {project.technology && (
                      <p className="text-xs text-gray-600">
                        <span className="font-medium">Technology:</span> {project.technology}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs my-1">
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

          <div className="mb-6">
            <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">Skills</h2>
            <div className="space-y-2 text-sm">
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
        </div>
      </div>

      {data.personalInfo.signature && (
        <div className="mt-8 flex justify-end">
          <img src={data.personalInfo.signature || "/placeholder.svg"} alt="Signature" className="h-12" />
        </div>
      )}
    </div>
  )
}

