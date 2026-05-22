// src/components/admin/StatCard.tsx
"use client";

import React from "react";
import { Icon } from "lucide-react";

interface StatCardProps {
  icon: React.ComponentType<any>;
  title: string;
  count: number;
}

export default function StatCard({ icon: IconComponent, title, count }: StatCardProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-primary/20 transition-colors">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg">
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <span className="text-2xl font-bold text-primary">{count}</span>
      </div>
    </div>
  );
}
