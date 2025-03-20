"use client"

import { useEffect, useState } from "react"
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto",
  },
  leftColumn: {
    width: "30%",
    backgroundColor: "#1e3a8a",
    color: "white",
    padding: 20,
  },
  rightColumn: {
    width: "70%",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 5,
  },
  rightSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e3a8a",
    paddingBottom: 5,
    color: "#1e3a8a",
  },
  contactItem: {
    marginBottom: 5,
    fontSize: 10,
  },
  skillItem: {
    marginBottom: 3,
    fontSize: 10,
  },
  objective: {
    fontSize: 10,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  experienceCompany: {
    fontSize: 10,
    marginBottom: 5,
  },
  experienceDate: {
    fontSize: 9,
    color: "#666",
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  projectItem: {
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  projectLinks: {
    fontSize: 9,
    color: "#1e3a8a",
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: "bold",
  },
  educationInstitution: {
    fontSize: 10,
  },
  educationYear: {
    fontSize: 9,
    color: "#666",
  },
  signature: {
    width: 100,
    height: 40,
    marginTop: 20,
  },
})

// Register fonts
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
})

export default function ResumePDF({ template, data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Convert base64 image to data URL if needed
  const getImageSource = (base64String) => {
    if (!base64String) return null
    return base64String.startsWith("data:") ? base64String : `data:image/jpeg;base64,${base64String}`
  }

  // Only render PDF content on the client
  if (!isClient) {
    return null
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          {data.personalInfo.profileImage && (
            <Image
              src={getImageSource(data.personalInfo.profileImage) || "/placeholder.svg"}
              style={styles.profileImage}
            />
          )}

          <Text style={styles.name}>{data.personalInfo.name}</Text>

          <Text style={styles.sectionTitle}>Contact</Text>
          {data.personalInfo.address && <Text style={styles.contactItem}>Address: {data.personalInfo.address}</Text>}
          {data.personalInfo.phone && <Text style={styles.contactItem}>Phone: {data.personalInfo.phone}</Text>}
          {data.personalInfo.email && <Text style={styles.contactItem}>Email: {data.personalInfo.email}</Text>}
          {data.personalInfo.github && <Text style={styles.contactItem}>GitHub: {data.personalInfo.github}</Text>}
          {data.personalInfo.portfolio && (
            <Text style={styles.contactItem}>Portfolio: {data.personalInfo.portfolio}</Text>
          )}
          {data.personalInfo.linkedin && <Text style={styles.contactItem}>LinkedIn: {data.personalInfo.linkedin}</Text>}

          <Text style={styles.sectionTitle}>Skill Highlights</Text>
          {data.skills.expert && (
            <>
              <Text style={[styles.skillItem, { fontWeight: "bold" }]}>Expert:</Text>
              <Text style={styles.skillItem}>{data.skills.expert}</Text>
            </>
          )}
          {data.skills.comfortable && (
            <>
              <Text style={[styles.skillItem, { fontWeight: "bold", marginTop: 5 }]}>Comfortable:</Text>
              <Text style={styles.skillItem}>{data.skills.comfortable}</Text>
            </>
          )}
          {data.skills.familiar && (
            <>
              <Text style={[styles.skillItem, { fontWeight: "bold", marginTop: 5 }]}>Familiar:</Text>
              <Text style={styles.skillItem}>{data.skills.familiar}</Text>
            </>
          )}
          {data.skills.tools && (
            <>
              <Text style={[styles.skillItem, { fontWeight: "bold", marginTop: 5 }]}>Tools:</Text>
              <Text style={styles.skillItem}>{data.skills.tools}</Text>
            </>
          )}
          {data.skills.others && (
            <>
              <Text style={[styles.skillItem, { fontWeight: "bold", marginTop: 5 }]}>Others:</Text>
              <Text style={styles.skillItem}>{data.skills.others}</Text>
            </>
          )}

          {data.personalInfo.signature && (
            <Image src={data.personalInfo.signature || "/placeholder.svg"} style={styles.signature} />
          )}
        </View>

        <View style={styles.rightColumn}>
          {data.objective && (
            <>
              <Text style={styles.rightSectionTitle}>Career Objective</Text>
              <Text style={styles.objective}>{data.objective}</Text>
            </>
          )}

          {data.experience && data.experience.length > 0 && (
            <>
              <Text style={styles.rightSectionTitle}>Experience</Text>
              {data.experience.map((exp, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.experienceTitle}>{exp.title}</Text>
                  <Text style={styles.experienceCompany}>
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ""}
                  </Text>
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.experienceDate}>
                      {exp.startDate}
                      {exp.endDate ? ` to ${exp.endDate}` : ""}
                    </Text>
                  )}
                  {exp.description && <Text style={styles.experienceDescription}>{exp.description}</Text>}
                </View>
              ))}
            </>
          )}

          {data.projects && data.projects.length > 0 && (
            <>
              <Text style={styles.rightSectionTitle}>Projects</Text>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  {project.technology && (
                    <Text style={[styles.projectLinks, { color: "#666" }]}>Technology: {project.technology}</Text>
                  )}
                  <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    {project.liveLink && <Text style={styles.projectLinks}>Live: {project.liveLink}</Text>}
                    {project.githubLink && (
                      <Text style={[styles.projectLinks, { marginLeft: 10 }]}>GitHub: {project.githubLink}</Text>
                    )}
                  </View>
                  {project.description && <Text style={styles.projectDescription}>{project.description}</Text>}
                </View>
              ))}
            </>
          )}

          {data.education && data.education.length > 0 && (
            <>
              <Text style={styles.rightSectionTitle}>Education</Text>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationInstitution}>
                    {edu.institution}
                    {edu.location ? `, ${edu.location}` : ""}
                  </Text>
                  {edu.year && <Text style={styles.educationYear}>{edu.year}</Text>}
                </View>
              ))}
            </>
          )}
        </View>
      </Page>
    </Document>
  )
}

