// src/app/admin/quotes/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Trash2, CheckCircle, Clock, Phone } from "lucide-react"
import { getQuoteRequests, updateQuoteRequestStatus, deleteQuoteRequest } from "@/lib/db"
import { QuoteRequest } from "@/lib/types"

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  reviewed: "bg-blue-100 text-blue-800 border-blue-300",
  contacted: "bg-green-100 text-green-800 border-green-300",
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5" />,
  reviewed: <CheckCircle className="h-3.5 w-3.5" />,
  contacted: <Phone className="h-3.5 w-3.5" />,
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)

  const fetchQuotes = async () => {
    setLoading(true)
    const data = await getQuoteRequests()
    setQuotes(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  const handleStatusChange = async (id: string, status: QuoteRequest["status"]) => {
    await updateQuoteRequestStatus(id, status)
    fetchQuotes()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quote request?")) {
      await deleteQuoteRequest(id)
      fetchQuotes()
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
          <h1 className="font-display text-3xl font-bold text-primary">Quote Requests</h1>
          <p className="text-gray-500 mt-1">Manage and respond to incoming quote requests from clients.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium text-primary">{quotes.length}</span> total requests
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400 text-lg">No quote requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left: Client Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-primary">{q.name}</h2>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusStyles[q.status]}`}>
                      {statusIcons[q.status]}
                      {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600">
                    <p><span className="font-medium text-gray-800">Email:</span> {q.email}</p>
                    <p><span className="font-medium text-gray-800">Phone:</span> {q.phone}</p>
                    {q.company && <p><span className="font-medium text-gray-800">Company:</span> {q.company}</p>}
                    <p><span className="font-medium text-gray-800">Scale:</span> {q.project_scale}</p>
                    <p><span className="font-medium text-gray-800">Timeline:</span> {q.timeline}</p>
                    <p><span className="font-medium text-gray-800">Budget:</span> {q.budget}</p>
                  </div>

                  {/* Services requested */}
                  <div className="flex flex-wrap gap-2">
                    {q.services.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-accent/10 text-accent-dark text-xs font-medium rounded-md border border-accent/20">
                        {s}
                      </span>
                    ))}
                  </div>

                  {q.description && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      {q.description}
                    </p>
                  )}

                  <p className="text-xs text-gray-400">
                    Submitted: {new Date(q.created_at).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-row lg:flex-col items-center gap-2 shrink-0">
                  <select
                    value={q.status}
                    onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteRequest["status"])}
                    className="px-3 py-1.5 text-sm rounded-md border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                  </select>
                  <button
                    onClick={() => handleDelete(q.id)}
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
