// src/app/admin/inquiries/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2, Mail, MailOpen, Reply } from "lucide-react"
import { getInquiries, updateInquiryStatus, deleteInquiry } from "@/lib/db"
import { Inquiry } from "@/lib/types"

const statusStyles: Record<string, string> = {
  unread: "bg-red-100 text-red-800 border-red-300",
  read: "bg-blue-100 text-blue-800 border-blue-300",
  responded: "bg-green-100 text-green-800 border-green-300",
}

const statusIcons: Record<string, React.ReactNode> = {
  unread: <Mail className="h-3.5 w-3.5" />,
  read: <MailOpen className="h-3.5 w-3.5" />,
  responded: <Reply className="h-3.5 w-3.5" />,
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const fetchInquiries = async () => {
    setLoading(true)
    const data = await getInquiries()
    setInquiries(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleStatusChange = async (id: string, status: Inquiry["status"]) => {
    await updateInquiryStatus(id, status)
    fetchInquiries()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      await deleteInquiry(id)
      fetchInquiries()
    }
  }

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/admin" className="inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold text-primary">Inquiries Management</h1>
          <p className="text-gray-500 mt-1">Manage and respond to incoming contact form messages.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-primary">{inquiries.length}</span> total inquiries
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-lg">No inquiries yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left: Contact Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-primary">{inq.name}</h2>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusStyles[inq.status]}`}>
                      {statusIcons[inq.status]}
                      {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-800">Email:</span> <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline">{inq.email}</a></p>
                    {inq.phone && <p><span className="font-medium text-gray-800">Phone:</span> {inq.phone}</p>}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mt-3">
                    <h3 className="font-medium text-gray-800 mb-2">Subject: {inq.subject}</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {inq.message}
                    </p>
                  </div>

                  <p className="text-xs text-gray-400">
                    Received: {new Date(inq.created_at).toLocaleString("en-NG", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row lg:flex-col items-center gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value as Inquiry["status"])}
                    className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded-md transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
