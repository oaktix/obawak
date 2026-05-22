// src/app/admin/services/[id]/edit/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { getServices, updateService } from "@/lib/db"
import { Service } from "@/lib/types"

export default function EditService() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const serviceId = params.id

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const all = await getServices()
      const found = all.find((s) => s.id === serviceId) || null
      setService(found)
      setLoading(false)
    }
    fetch()
  }, [serviceId])

  if (loading) {
    return <p className="p-8 text-gray-600">Loading…</p>
  }

  if (!service) {
    return <p className="p-8 text-red-600">Service not found.</p>
  }

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
    const prepared = {
      ...data,
      benefits: data.benefits ? data.benefits.split(",").map((s: string) => s.trim()) : [],
      process_steps: data.process_steps ? JSON.parse(data.process_steps) : [],
      faqs: data.faqs ? JSON.parse(data.faqs) : [],
      is_featured: !!data.is_featured,
    }
    await updateService(serviceId, prepared)
    router.push("/admin/services")
  }

  const initialData = {
    title: service.title,
    slug: service.slug,
    short_description: service.short_description,
    long_description: service.long_description,
    icon: service.icon,
    benefits: service.benefits?.join(", ") ?? "",
    process_steps: JSON.stringify(service.process_steps ?? []),
    faqs: JSON.stringify(service.faqs ?? []),
    is_featured: service.is_featured,
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Edit Service</h1>
      <EditForm fields={fields} initialData={initialData} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
