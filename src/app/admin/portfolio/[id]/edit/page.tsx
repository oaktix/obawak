// src/app/admin/portfolio/[id]/edit/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { getProjects, updateProject } from "@/lib/db"
import { Project } from "@/lib/types"

export default function EditPortfolio() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const projectId = params.id

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const all = await getProjects()
      const found = all.find((p) => p.id === projectId) || null
      setProject(found)
      setLoading(false)
    }
    fetch()
  }, [projectId])

  if (loading) {
    return <p className="p-8 text-gray-600">Loading…</p>
  }

  if (!project) {
    return <p className="p-8 text-red-600">Project not found.</p>
  }

  const fields = [
    { name: "title", label: "Title", required: true },
    { name: "slug", label: "Slug (URL friendly)", required: true },
    { name: "description", label: "Description", textarea: true, required: true },
    { name: "cover_image", label: "Cover Image URL", required: true },
    { name: "is_featured", label: "Featured (true/false)", type: "checkbox" },
    { name: "client", label: "Client" },
    { name: "location", label: "Location" },
    { name: "completion_date", label: "Completion Date" },
    { name: "service_id", label: "Service ID (optional)" },
    { name: "images", label: "Gallery Image URLs (comma‑separated)", placeholder: "https://...jpg, https://...png" },
  ]

  const handleSubmit = async (data: Record<string, any>) => {
    const prepared = {
      ...data,
      is_featured: !!data.is_featured,
      images: data.images ? data.images.split(",").map((s: string) => s.trim()) : [],
    }
    await updateProject(projectId, prepared)
    router.push("/admin/portfolio")
  }

  const initialData = {
    title: project.title,
    slug: project.slug,
    description: project.description,
    cover_image: project.cover_image,
    is_featured: project.is_featured,
    client: project.client ?? "",
    location: project.location ?? "",
    completion_date: project.completion_date ?? "",
    service_id: project.service_id ?? "",
    images: project.images?.join(", ") ?? "",
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Edit Portfolio Project</h1>
      <EditForm fields={fields} initialData={initialData} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
