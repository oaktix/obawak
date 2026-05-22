// src/app/admin/layout.tsx
"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // This layout provides a fixed sidebar and a main content area for all admin routes.
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar navigation */}
      <Sidebar />
      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-primary/95 text-white px-6 py-3 border-b border-white/10 shadow-sm">
          <h1 className="font-display text-lg">Admin Dashboard</h1>
          {/* Empty space for potential future items */}
          <div />
        </header>
        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
