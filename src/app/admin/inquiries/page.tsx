// src/app/admin/inquiries/page.tsx
"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AdminInquiries() {
  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h1 className="font-display text-2xl mb-4">Inquiries Management</h1>
      <p className="mb-6 text-gray-600">Placeholder page for managing contact inquiries.</p>
      <Link href="/admin" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
        Back to Dashboard
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  )
}
