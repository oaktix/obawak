// src/components/admin/DataTable.tsx
"use client"

import React from "react"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"

/**
 * Generic table component for admin listings.
 * columns: array of { key: string; label: string }
 * data: array of any objects
 * onDelete: (id: string) => void // called after user confirms
 */
export default function DataTable({
  columns,
  data,
  onDelete,
}: {
  columns: { key: string; label: string }[]
  data: any[]
  onDelete: (id: string) => void
}) {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      onDelete(id)
    }
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 dark:border-gray-700">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                  {row[col.key] ?? "-"}
                </td>
              ))}
              <td className="px-4 py-2 space-x-2">
                <Link
                  href={`${"/admin"}/${row._section ?? ""}/${row.id}/edit`}
                  className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
