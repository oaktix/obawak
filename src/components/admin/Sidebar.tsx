// src/components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Home, LayoutDashboard, Settings, Grid2X2, Calendar, BookOpen, MessageSquare, FileText, LogOut, Key } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const adminLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Homepage", href: "/admin/homepage", icon: Home },
  { name: "Services", href: "/admin/services", icon: Settings },
  { name: "Portfolio", href: "/admin/portfolio", icon: Grid2X2 },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Inquiries", href: "/admin/inquiries", icon: Calendar },
  { name: "Quotes", href: "/admin/quotes", icon: BookOpen },
  { name: "Security", href: "/admin/settings", icon: Key },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("obawak_admin_logged");
    window.dispatchEvent(new Event("admin_login_status"));
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden absolute top-4 left-4 z-40 p-2 bg-primary/80 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Sidebar navigation */}
      <nav
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary/95 text-white p-4 space-y-4 border-r border-white/10 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:relative md:translate-x-0 md:flex flex-col`}
      >
        <div className="flex-1 space-y-2 mt-12 md:mt-0">
          {adminLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-colors ${
                  isActive ? "bg-accent/20 text-accent" : "hover:bg-white/5 hover:text-accent"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2 px-3 rounded-md text-red-400 hover:bg-red-600/20 hover:text-red-200 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </nav>
    </>
  );
}
