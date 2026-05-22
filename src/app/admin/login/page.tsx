// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

// Simple password gate – in production replace with proper auth
const ADMIN_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulated async check (could be a fetch to a secure endpoint)
    await new Promise((r) => setTimeout(r, 500));
    if (password === ADMIN_PASSWORD) {
      setStatus("success");
      // Persist admin login flag
      if (typeof window !== "undefined") {
        localStorage.setItem("obawak_admin_logged", "true");
        window.dispatchEvent(new Event("admin_login_status"));
      }
      // Redirect to admin dashboard after a brief success flash
      setTimeout(() => router.push("/admin"), 800);
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="font-display text-2xl text-primary text-center">Admin Access</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="password">
              Enter Access Code
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center bg-primary text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {status === "loading" ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Authenticating…</>
            ) : (
              "Unlock Dashboard"
            )}
          </button>
        </form>
        {status === "error" && (
          <div className="flex items-center text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2 mt-2">
            <AlertCircle className="h-4 w-4 mr-2"/>Invalid access code
          </div>
        )}
        {status === "success" && (
          <div className="flex items-center text-xs text-green-600 bg-green-50 border border-green-200 rounded p-2 mt-2">
            <CheckCircle2 className="h-4 w-4 mr-2"/>Access granted – redirecting…
          </div>
        )}
      </div>
    </section>
  );
}
