// src/app/admin/testimonials/[id]/edit/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { getTestimonials, updateTestimonial } from "@/lib/db"
import { Testimonial } from "@/lib/types"

export default function EditTestimonial() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const testimonialId = params.id

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const all = await getTestimonials(false)
      const found = all.find((t) => t.id === testimonialId) || null
      setTestimonial(found)
      setLoading(false)
    }
    fetch()
  }, [testimonialId])

  if (loading) {
    return <p className="p-8 text-gray-600">Loading…</p>
  }

  if (!testimonial) {
    return <p className="p-8 text-red-600">Testimonial not found.</p>
  }

  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "role", label: "Role", required: true },
    { name: "company", label: "Company" },
    { name: "content", label: "Content", textarea: true, required: true },
    { name: "rating", label: "Rating (1-5)", type: "number", required: true },
    { name: "photo_url", label: "Photo URL" },
    { name: "is_approved", label: "Approved (true/false)", type: "checkbox" },
  ]

  const handleSubmit = async (data: Record<string, any>) => {
    const prepared = {
      ...data,
      rating: parseInt(data.rating, 10) || 5,
      is_approved: !!data.is_approved,
    }
    await updateTestimonial(testimonialId, prepared)
    router.push("/admin/testimonials")
  }

  const initialData = {
    name: testimonial.name,
    role: testimonial.role,
    company: testimonial.company ?? "",
    content: testimonial.content,
    rating: testimonial.rating,
    photo_url: testimonial.photo_url ?? "",
    is_approved: testimonial.is_approved,
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Edit Testimonial</h1>
      <EditForm fields={fields} initialData={initialData} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
