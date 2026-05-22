// src/app/admin/blog/[id]/edit/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { getBlogPosts, updateBlogPost } from "@/lib/db"
import { BlogPost } from "@/lib/types"

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const postId = params.id

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const all = await getBlogPosts(false) // include unpublished
      const found = all.find((p) => p.id === postId) || null
      setPost(found)
      setLoading(false)
    }
    fetch()
  }, [postId])

  if (loading) {
    return <p className="p-8 text-gray-600">Loading…</p>
  }

  if (!post) {
    return <p className="p-8 text-red-600">Blog post not found.</p>
  }

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
    await updateBlogPost(postId, prepared)
    router.push("/admin/blog")
  }

  const initialData = {
    title: post.title,
    slug: post.slug,
    category: post.category ?? "",
    featured_image: post.featured_image ?? "",
    summary: post.summary,
    content: post.content,
    published: post.published,
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Edit Blog Post</h1>
      <EditForm fields={fields} initialData={initialData} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
