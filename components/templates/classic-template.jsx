"use client"

export default function ClassicTemplate({ data }) {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="bg-blue-800 text-white p-6 md:w-1/3">
        <div className="flex flex-col items-center mb-6">
          {data.personalInfo.profileImage && (
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
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
          <h1 className="text-2xl font-bold text-center">{data.personalInfo.name}</h1>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-white pb-1 mb-3">Contact</h2>
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
            {data.personalInfo.github && (
              <p>
                <span className="font-semibold">GitHub:</span>{" "}
                <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" className="underline">
                  {data.personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                </a>
              </p>
            )}
            {data.personalInfo.portfolio && (
              <p>
                <span className="font-semibold">Portfolio:</span>{" "}
                <a href={data.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="underline">
                  {data.personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </p>
            )}
            {data.personalInfo.linkedin && (
              <p>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="underline">
                  {data.personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b border-white pb-1 mb-3">Skill Highlights</h2>
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
          <div className="mt-auto">
            <img src={data.personalInfo.signature || "/placeholder.svg"} alt="Signature" className="h-16 mx-auto" />
          </div>
        )}
      </div>

      <div className="p-6 md:w-2/3">
        {data.objective && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b border-blue-800 pb-1 mb-3">Career Objective</h2>
            <p className="text-sm">{data.objective}</p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && data.experience[0].title && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b border-blue-800 pb-1 mb-3">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index}>
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
                  {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects && data.projects.length > 0 && data.projects[0].title && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b border-blue-800 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index}>
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
                  {project.description && <p className="text-sm">{project.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && data.education[0].degree && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-800 border-b border-blue-800 pb-1 mb-3">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index}>
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
  )
}

