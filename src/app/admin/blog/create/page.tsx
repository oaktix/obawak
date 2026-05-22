// src/app/admin/blog/create/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { createBlogPost } from "@/lib/db"

export default function CreateBlogPost() {
  const router = useRouter()

  const fields = [
    { name: "title", label: "Title", required: true },
    { name: "slug", label: "Slug (URL friendly)", required: true },
    { name: "category", label: "Category", required: true },
    { name: "featured_image", label: "Featured Image URL", required: true },
    { name: "summary", label: "Summary", required: true },
    { name: "content", label: "Content", textarea: true, required: true },
    { name: "published", label: "Published (true/false)", type: "checkbox" },
  ]

  const handleSubmit = async (data: Record<string, any>) => {
    const prepared = {
      ...data,
      published: !!data.published,
    }
    await createBlogPost(prepared as any)
    router.push("/admin/blog")
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Create Blog Post</h1>
      <EditForm fields={fields} onSubmit={handleSubmit} submitLabel="Create Post" />
    </div>
  )
}
