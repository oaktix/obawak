// src/app/admin/testimonials/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { getTestimonials, deleteTestimonial } from "@/lib/db"
import { Testimonial } from "@/lib/types"

export default function AdminTestimonialsList() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTestimonials = async () => {
    setLoading(true)
    const data = await getTestimonials(false) // include unapproved for admin
    setTestimonials(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteTestimonial(id)
    fetchTestimonials()
  }

  const columns = [
    { key: "name", label: "Author" },
    { key: "content", label: "Content" },
    { key: "is_approved", label: "Approved" },
    { key: "created_at", label: "Created" },
  ]

  const dataWithSection = testimonials.map((t) => ({ ...t, _section: "testimonials" }))

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">Testimonials Management</h1>
        <Link
          href="/admin/testimonials/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading testimonials…</p>
      ) : (
        <DataTable columns={columns} data={dataWithSection} onDelete={handleDelete} />
      )}
    </div>
  )
}
