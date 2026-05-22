"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling down 150px
    const toggleVisibility = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://wa.me/2347066692068?text=Hello%20Obawak%20Consult,%20I'd%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center animate-pulse-gold group cursor-pointer"
      title="Chat with Obawak Consult"
    >
      <MessageCircle className="h-6 w-6 transform group-hover:rotate-12 transition-transform duration-300" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-out whitespace-nowrap">
        Live Chat
      </span>
    </a>
  );
}
