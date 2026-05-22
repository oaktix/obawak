// src/app/admin/settings/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, ShieldCheck, AlertCircle, Save } from "lucide-react";

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    // 1. Check current password
    const expectedCurrent = localStorage.getItem("obawak_admin_custom_password") || "admin123";
    
    if (currentPassword !== expectedCurrent) {
      setStatus("error");
      setErrorMessage("Current password is incorrect.");
      return;
    }

    // 2. Check length
    if (newPassword.length < 6) {
      setStatus("error");
      setErrorMessage("New password must be at least 6 characters long.");
      return;
    }

    // 3. Check match
    if (newPassword !== confirmPassword) {
      setStatus("error");
      setErrorMessage("New passwords do not match.");
      return;
    }

    // 4. Save
    localStorage.setItem("obawak_admin_custom_password", newPassword);
    setStatus("success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-primary flex items-center">
            <KeyRound className="h-8 w-8 mr-3 text-accent" />
            Security Settings
          </h1>
          <p className="text-gray-500 mt-2">Manage your administrative access credentials.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-primary mb-6 border-b border-gray-100 pb-3">Change Password</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
                {errorMessage}
              </div>
            )}

            {status === "success" && (
              <div className="flex items-center text-sm text-green-700 bg-green-50 p-3 rounded-md border border-green-100">
                <ShieldCheck className="h-4 w-4 mr-2 shrink-0" />
                Password successfully updated! Your new password will be required on your next login.
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
