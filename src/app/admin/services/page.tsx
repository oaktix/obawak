// src/app/admin/services/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { getServices, deleteService } from "@/lib/db"
import { Service } from "@/lib/types"

export default function AdminServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const fetchServices = async () => {
    setLoading(true)
    const data = await getServices()
    setServices(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteService(id)
    // Refresh list after deletion
    fetchServices()
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "created_at", label: "Created" },
  ]

  // Attach a hidden _section field for DataTable to resolve edit link path
  const dataWithSection = services.map((s) => ({ ...s, _section: "services" }))

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">Services Management</h1>
        <Link
          href="/admin/services/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading services…</p>
      ) : (
        <DataTable columns={columns} data={dataWithSection} onDelete={handleDelete} />
      )}
    </div>
  )
}
