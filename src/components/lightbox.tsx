"use client";

import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    // Disable background page scrolling when lightbox is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Upper Control Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
        <span className="text-sm font-medium tracking-widest uppercase font-mono">
          Image {currentIndex + 1} of {images.length}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          title="Close lightbox (Esc)"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation - Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer z-10"
          title="Previous image (Left arrow)"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Main Image View */}
      <div
        className="max-w-4xl max-h-[80vh] px-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={currentImage}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl border border-white/5 animate-slide-up"
        />
      </div>

      {/* Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer z-10"
          title="Next image (Right arrow)"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}
