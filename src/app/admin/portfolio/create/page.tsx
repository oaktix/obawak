// src/app/admin/portfolio/create/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { createProject } from "@/lib/db"

export default function CreatePortfolioProject() {
  const router = useRouter()

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
    await createProject(prepared as any)
    router.push("/admin/portfolio")
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Create Portfolio Project</h1>
      <EditForm fields={fields} onSubmit={handleSubmit} submitLabel="Create Project" />
    </div>
  )
}
