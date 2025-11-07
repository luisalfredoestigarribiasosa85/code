import { notFound } from "next/navigation"
import { projects } from "@/lib/projects"
import { ProjectDetailClient } from "@/components/project-detail-client"

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.title.en} | Luis Estigarribia`,
    description: project.description.en,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}