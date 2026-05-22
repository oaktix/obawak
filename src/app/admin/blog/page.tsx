// src/app/admin/blog/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { getBlogPosts, deleteBlogPost } from "@/lib/db"
import { BlogPost } from "@/lib/types"

export default function AdminBlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    const data = await getBlogPosts(false) // include unpublished for admin
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    await deleteBlogPost(id)
    fetchPosts()
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "slug", label: "Slug" },
    { key: "published", label: "Published" },
    { key: "created_at", label: "Created" },
  ]

  const dataWithSection = posts.map((p) => ({ ...p, _section: "blog" }))

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">Blog Management</h1>
        <Link
          href="/admin/blog/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Post
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading blog posts…</p>
      ) : (
        <DataTable columns={columns} data={dataWithSection} onDelete={handleDelete} />
      )}
    </div>
  )
}
