// src/app/admin/services/create/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { createService } from "@/lib/db"

export default function CreateService() {
  const router = useRouter()

  const fields = [
    { name: "title", label: "Title", required: true },
    { name: "slug", label: "Slug (URL friendly)", required: true },
    { name: "short_description", label: "Short Description", required: true },
    { name: "long_description", label: "Long Description", textarea: true },
    { name: "icon", label: "Icon name (lucide)" },
    { name: "benefits", label: "Benefits (comma‑separated)", placeholder: "Benefit 1, Benefit 2" },
    { name: "process_steps", label: "Process Steps (JSON array string)", placeholder: "[{\"title\":\"...\",\"description\":\"...\"}]" },
    { name: "faqs", label: "FAQs (JSON array string)", placeholder: "[{\"question\":\"...\",\"answer\":\"...\"}]" },
    { name: "is_featured", label: "Featured (true/false)", type: "checkbox" },
  ]

  const handleSubmit = async (data: Record<string, any>) => {
    // Convert comma‑separated strings into arrays where appropriate
    const prepared = {
      ...data,
      benefits: data.benefits ? data.benefits.split(",").map((s: string) => s.trim()) : [],
      process_steps: data.process_steps ? JSON.parse(data.process_steps) : [],
      faqs: data.faqs ? JSON.parse(data.faqs) : [],
      is_featured: !!data.is_featured,
    }
    await createService(prepared as any)
    router.push("/admin/services")
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Create New Service</h1>
      <EditForm fields={fields} onSubmit={handleSubmit} submitLabel="Create Service" />
    </div>
  )
}
