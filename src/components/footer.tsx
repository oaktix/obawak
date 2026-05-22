"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Shield, Zap, ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                OBAWAK<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Obawak Consult provides high-end electrical installations, smart surveillance networks, advanced structured cabling, and smart renewable energy arrays.
            </p>
            {/* Certifications description */}
            <div className="pt-2 flex items-center space-x-4">
              <div className="flex items-center text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white/80">
                <Shield className="h-3.5 w-3.5 text-accent mr-1.5" />
                COREN Cert.
              </div>
              <div className="flex items-center text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white/80">
                <Zap className="h-3.5 w-3.5 text-accent mr-1.5" />
                IEEE Compliant
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-accent mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/electrical-installations"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Electrical Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/services/smart-security-systems"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Surveillance & CCTV
                </Link>
              </li>
              <li>
                <Link
                  href="/services/network-structured-cabling"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Structured Cabling
                </Link>
              </li>
              <li>
                <Link
                  href="/services/solar-energy-systems"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Smart Solar Energy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-accent mb-4">
              Corporate
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  About Our Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Project Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Technical Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-accent text-sm transition-colors"
                >
                  Contact Office
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-accent/60 hover:text-accent text-xs font-mono transition-colors block pt-2"
                >
                  [ Administrative Area ]
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-accent mb-2">
              Stay Informed
            </h3>
            <p className="text-white/60 text-xs">
              Subscribe to get our quarterly engineering circulars and technical whitepapers.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter corporate email"
                className="bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs rounded-l-md px-3 py-2 w-full focus:outline-none focus:border-accent"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark text-primary px-3 py-2 rounded-r-md transition-colors cursor-pointer"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <span className="text-[10px] text-accent animate-pulse block">
                Subscription received! Thank you for subscribing.
              </span>
            )}

            <div className="pt-2 space-y-2 border-t border-white/5 text-xs text-white/60">
              <div className="flex items-center">
                <Phone className="h-3.5 w-3.5 text-accent mr-2 shrink-0" />
                <span>+234 (803) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-3.5 w-3.5 text-accent mr-2 shrink-0" />
                <span>inquiries@obawakconsult.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3.5 w-3.5 text-accent mr-2 shrink-0" />
                <span>Lekki Phase 1, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Obawak Consult. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-accent transition-colors">Privacy Policy</span>
            <span className="hover:text-accent transition-colors">Terms of Operations</span>
            <span className="hover:text-accent transition-colors">SLA Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
