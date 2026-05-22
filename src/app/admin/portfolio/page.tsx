// src/app/admin/portfolio/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { getProjects, deleteProject } from "@/lib/db"
import { Project } from "@/lib/types"

export default function AdminPortfolioList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    setLoading(true)
    const data = await getProjects()
    setProjects(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteProject(id)
    fetchProjects()
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "service_title", label: "Service" },
  ]

  const dataWithSection = projects.map((p) => ({ ...p, _section: "portfolio" }))

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">Portfolio Management</h1>
        <Link
          href="/admin/portfolio/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading projects…</p>
      ) : (
        <DataTable columns={columns} data={dataWithSection} onDelete={handleDelete} />
      )}
    </div>
  )
}
