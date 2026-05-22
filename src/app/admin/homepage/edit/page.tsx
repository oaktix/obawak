// src/app/admin/homepage/edit/page.tsx
"use client"

import React from "react"
import { useRouter } from "next/navigation"
import EditForm from "@/components/admin/EditForm"
import { updateHomepageContent, getHomepageContent } from "@/lib/db"
import { useEffect, useState } from "react"

export default function EditHomepage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [initial, setInitial] = useState({ content: "" })

  useEffect(() => {
    const fetch = async () => {
      const data = await getHomepageContent()
      setInitial({ content: JSON.stringify(data.content, null, 2) })
      setLoading(false)
    }
    fetch()
  }, [])

  const fields = [
    { name: "content", label: "Homepage Content (HTML or markdown)", textarea: true, required: true },
  ]

  const handleSubmit = async (data: Record<string, any>) => {
    let parsed = {};
    try {
      parsed = JSON.parse(data.content);
    } catch (e) {
      alert("Invalid JSON content");
      return;
    }
    await updateHomepageContent(parsed)
    router.push("/admin")
  }

  if (loading) return <p className="p-8 text-gray-600">Loading…</p>

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="font-display text-2xl mb-6">Edit Homepage Content</h1>
      <EditForm fields={fields} initialData={initial} onSubmit={handleSubmit} submitLabel="Save" />
    </div>
  )
}
