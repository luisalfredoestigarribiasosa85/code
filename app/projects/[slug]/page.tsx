import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import { ProjectDetailClient } from "@/components/project-detail-client"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.title.en} | Luis Estigarribia`,
    description: project.description.en,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
