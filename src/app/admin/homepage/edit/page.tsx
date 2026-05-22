// src/app/admin/homepage/edit/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Save, Loader2 } from "lucide-react"
import { updateHomepageContent, getHomepageContent } from "@/lib/db"

export default function EditHomepage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getHomepageContent()
        if (data && data.content) {
          setFormData(data.content)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const handleNestedChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // --- Stats Helpers ---
  const handleStatChange = (index: number, field: "label" | "value", value: string) => {
    const newStats = [...(formData.hero?.stats || [])]
    newStats[index] = { ...newStats[index], [field]: value }
    setFormData((prev: any) => ({ ...prev, hero: { ...prev.hero, stats: newStats } }))
  }

  const addStat = () => {
    const newStats = [...(formData.hero?.stats || []), { label: "", value: "" }]
    setFormData((prev: any) => ({ ...prev, hero: { ...prev.hero, stats: newStats } }))
  }

  const removeStat = (index: number) => {
    const newStats = [...(formData.hero?.stats || [])]
    newStats.splice(index, 1)
    setFormData((prev: any) => ({ ...prev, hero: { ...prev.hero, stats: newStats } }))
  }

  // --- Bullets Helpers ---
  const handleBulletChange = (index: number, value: string) => {
    const newBullets = [...(formData.aboutPreview?.bullets || [])]
    newBullets[index] = value
    setFormData((prev: any) => ({ ...prev, aboutPreview: { ...prev.aboutPreview, bullets: newBullets } }))
  }

  const addBullet = () => {
    const newBullets = [...(formData.aboutPreview?.bullets || []), ""]
    setFormData((prev: any) => ({ ...prev, aboutPreview: { ...prev.aboutPreview, bullets: newBullets } }))
  }

  const removeBullet = (index: number) => {
    const newBullets = [...(formData.aboutPreview?.bullets || [])]
    newBullets.splice(index, 1)
    setFormData((prev: any) => ({ ...prev, aboutPreview: { ...prev.aboutPreview, bullets: newBullets } }))
  }

  // --- Why Choose Us Items Helpers ---
  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newItems = [...(formData.whyChooseUs?.items || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    setFormData((prev: any) => ({ ...prev, whyChooseUs: { ...prev.whyChooseUs, items: newItems } }))
  }

  const addFeature = () => {
    const newItems = [...(formData.whyChooseUs?.items || []), { title: "", description: "", icon: "Shield" }]
    setFormData((prev: any) => ({ ...prev, whyChooseUs: { ...prev.whyChooseUs, items: newItems } }))
  }

  const removeFeature = (index: number) => {
    const newItems = [...(formData.whyChooseUs?.items || [])]
    newItems.splice(index, 1)
    setFormData((prev: any) => ({ ...prev, whyChooseUs: { ...prev.whyChooseUs, items: newItems } }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateHomepageContent(formData)
      alert("Homepage saved successfully!")
    } catch (err: any) {
      alert("Failed to save: " + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!formData) return <p className="p-8">No homepage content found.</p>

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin" className="p-2 text-gray-500 hover:text-primary transition-colors hover:bg-gray-200 rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl font-bold text-primary">Edit Homepage</h1>
            <p className="text-gray-500 text-sm">Visually edit the content on your main landing page.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* --- HERO SECTION --- */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-display text-xl font-bold text-primary mb-4 border-b pb-2">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                <input type="text" value={formData.hero?.title || ""} onChange={(e) => handleNestedChange("hero", "title", e.target.value)} required className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                <textarea rows={3} value={formData.hero?.subtitle || ""} onChange={(e) => handleNestedChange("hero", "subtitle", e.target.value)} required className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                  <input type="text" value={formData.hero?.ctaText || ""} onChange={(e) => handleNestedChange("hero", "ctaText", e.target.value)} required className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                  <input type="text" value={formData.hero?.ctaLink || ""} onChange={(e) => handleNestedChange("hero", "ctaLink", e.target.value)} required className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-gray-700">Metrics & Stats</label>
                  <button type="button" onClick={addStat} className="text-xs flex items-center text-accent hover:text-accent-dark font-medium">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Stat
                  </button>
                </div>
                <div className="space-y-3">
                  {(formData.hero?.stats || []).map((stat: any, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input type="text" placeholder="Value (e.g. 15+)" value={stat.value} onChange={(e) => handleStatChange(idx, "value", e.target.value)} className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" />
                      <input type="text" placeholder="Label (e.g. Years Experience)" value={stat.label} onChange={(e) => handleStatChange(idx, "label", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" />
                      <button type="button" onClick={() => removeStat(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- ABOUT PREVIEW SECTION --- */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-display text-xl font-bold text-primary mb-4 border-b pb-2">About Us Preview</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mini Subtitle (Kicker)</label>
                <input type="text" value={formData.aboutPreview?.subtitle || ""} onChange={(e) => handleNestedChange("aboutPreview", "subtitle", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input type="text" value={formData.aboutPreview?.title || ""} onChange={(e) => handleNestedChange("aboutPreview", "title", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body Text</label>
                <textarea rows={4} value={formData.aboutPreview?.text || ""} onChange={(e) => handleNestedChange("aboutPreview", "text", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              
              {/* Bullets */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-gray-700">Key Bullet Points</label>
                  <button type="button" onClick={addBullet} className="text-xs flex items-center text-accent hover:text-accent-dark font-medium">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Bullet
                  </button>
                </div>
                <div className="space-y-3">
                  {(formData.aboutPreview?.bullets || []).map((bullet: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <input type="text" value={bullet} onChange={(e) => handleBulletChange(idx, e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" />
                      <button type="button" onClick={() => removeBullet(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- WHY CHOOSE US SECTION --- */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-display text-xl font-bold text-primary mb-4 border-b pb-2">Why Choose Us</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mini Subtitle (Kicker)</label>
                <input type="text" value={formData.whyChooseUs?.subtitle || ""} onChange={(e) => handleNestedChange("whyChooseUs", "subtitle", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input type="text" value={formData.whyChooseUs?.title || ""} onChange={(e) => handleNestedChange("whyChooseUs", "title", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              
              {/* Features List */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-bold text-gray-700">Feature Items</label>
                  <button type="button" onClick={addFeature} className="text-xs flex items-center text-accent hover:text-accent-dark font-medium">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Feature
                  </button>
                </div>
                <div className="space-y-4">
                  {(formData.whyChooseUs?.items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1 space-y-3">
                        <div className="flex gap-3">
                          <input type="text" placeholder="Title" value={item.title} onChange={(e) => handleFeatureChange(idx, "title", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" />
                          <input type="text" placeholder="Icon Name (Lucide)" value={item.icon} onChange={(e) => handleFeatureChange(idx, "icon", e.target.value)} className="w-1/3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" />
                        </div>
                        <textarea placeholder="Description" rows={2} value={item.description} onChange={(e) => handleFeatureChange(idx, "description", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm" />
                      </div>
                      <button type="button" onClick={() => removeFeature(idx)} className="mt-1 p-2 text-red-500 hover:bg-red-100 bg-white border border-red-200 rounded-md transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- CONTACT INFO --- */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="font-display text-xl font-bold text-primary mb-4 border-b pb-2">Global Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="text" value={formData.contactInfo?.phone || ""} onChange={(e) => handleNestedChange("contactInfo", "phone", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="text" value={formData.contactInfo?.email || ""} onChange={(e) => handleNestedChange("contactInfo", "email", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                <input type="text" value={formData.contactInfo?.address || ""} onChange={(e) => handleNestedChange("contactInfo", "address", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
                <input type="text" value={formData.contactInfo?.hours || ""} onChange={(e) => handleNestedChange("contactInfo", "hours", e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
              </div>
            </div>
          </section>

          {/* Floating Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 flex justify-end px-8">
            <div className="flex gap-4 max-w-7xl w-full mx-auto justify-end">
              <Link href="/admin" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-4 w-4 mr-2" /> Save Homepage</>}
              </button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}
