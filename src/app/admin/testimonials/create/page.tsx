// src/app/admin/testimonials/create/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { createTestimonial } from "@/lib/db"

export default function CreateTestimonial() {
  const router = useRouter()

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
    await createTestimonial(prepared as any)
    router.push("/admin/testimonials")
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Create Testimonial</h1>
      <EditForm fields={fields} onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  )
}
