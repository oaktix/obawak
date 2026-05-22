// src/app/admin/homepage/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { getHomepageContent } from "@/lib/db"

export default function AdminHomepage() {
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const data = await getHomepageContent()
      setContent(JSON.stringify(data.content, null, 2))
      setLoading(false)
    }
    fetch()
  }, [])

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl">Homepage Content</h1>
        <Link
          href="/admin/homepage/edit"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
          Edit
        </Link>
      </div>
      {loading ? (
        <p className="text-gray-600">Loading…</p>
      ) : (
        <pre className="p-4 bg-white shadow rounded-md overflow-auto text-sm">{content}</pre>
      )}
    </div>
  )
}
