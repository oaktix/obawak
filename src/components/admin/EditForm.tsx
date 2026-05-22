// src/components/admin/EditForm.tsx
"use client"

import React, { useState } from "react"

/**
 * Generic form component used by admin CRUD pages.
 *   fields: [{ name, label, type, placeholder, required }]
 *   initialData: object with pre‑filled values (for edit)
 *   onSubmit: async (data) => void – called with form values
 */
export default function EditForm({
  fields,
  initialData = {},
  onSubmit,
  submitLabel = "Save",
}: {
  fields: {
    name: string
    label: string
    type?: string
    placeholder?: string
    required?: boolean
    textarea?: boolean
  }[]
  initialData?: Record<string, any>
  onSubmit: (data: Record<string, any>) => Promise<void>
  submitLabel?: string
}) {
  const [formData, setFormData] = useState(() => {
    const obj: Record<string, any> = {}
    fields.forEach((f) => {
      obj[f.name] = initialData[f.name] ?? ""
    })
    return obj
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    setFormData((prev) => ({ ...prev, [name]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onSubmit(formData)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  // Sync formData when initialData changes
  const initialDataStr = JSON.stringify(initialData);
  React.useEffect(() => {
    const obj: Record<string, any> = {};
    fields.forEach((f) => {
      obj[f.name] = initialData[f.name] ?? '';
    });
    setFormData(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialDataStr]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="p-2 bg-green-100 text-green-800 rounded">
          Saved successfully!
        </div>
      )}
      {fields.map((field) => (
        <div key={field.name} className={field.type === "checkbox" ? "flex items-center space-x-2" : ""}>
          {field.type !== "checkbox" && (
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
          )}
          {field.textarea ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              rows={4}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          ) : field.type === "checkbox" ? (
            <>
              <input
                type="checkbox"
                name={field.name}
                id={field.name}
                checked={!!formData[field.name]}
                onChange={handleChange}
                required={field.required}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                {field.label}
              </label>
            </>
          ) : (
            <input
              type={field.type ?? "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  )
}
