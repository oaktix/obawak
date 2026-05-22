"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check if we are in admin dashboard and if admin is logged in locally
  useEffect(() => {
    const checkLogin = () => {
      const logged = localStorage.getItem("obawak_admin_logged") === "true";
      setIsAdminLoggedIn(logged);
    };

    checkLogin();
    // Listen to changes to login status
    window.addEventListener("admin_login_status", checkLogin);
    return () => window.removeEventListener("admin_login_status", checkLogin);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem("obawak_admin_logged");
    window.dispatchEvent(new Event("admin_login_status"));
    router.push("/admin/login");
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Insights", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // If we are in the admin dashboard panel, show custom admin nav links
  const isAdminPage = pathname?.startsWith("/admin");

  const adminLinks = [
    { name: "Overview", href: "/admin" },
    { name: "Homepage", href: "/admin/homepage" },
    { name: "Services", href: "/admin/services" },
    { name: "Portfolio", href: "/admin/portfolio" },
    { name: "Blogs", href: "/admin/blog" },
    { name: "Testimonials", href: "/admin/testimonials" },
    { name: "Inquiries", href: "/admin/inquiries" },
  ];

  const activeLinkClass = "text-accent font-semibold border-b-2 border-accent";
  const inactiveLinkClass = "text-white/80 hover:text-accent transition-colors duration-200";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "bg-primary/95 shadow-lg backdrop-blur-md py-3"
          : "bg-primary/80 backdrop-blur-sm py-4 border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                OBAWAK<span className="text-accent">.</span>
              </span>
              <span className="text-[10px] bg-accent/15 border border-accent/20 text-accent font-semibold px-2 py-0.5 rounded tracking-widest uppercase">
                {isAdminPage ? "Admin CMS" : "Consult"}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {isAdminPage && isAdminLoggedIn ? (
              // Admin links
              <>
                {adminLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-sm py-2 transition-all ${
                        isActive ? activeLinkClass : inactiveLinkClass
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <button
                  onClick={handleAdminLogout}
                  className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs px-3 py-1.5 rounded transition-all duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              // Public links
              <>
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-sm py-2 transition-all ${
                        isActive ? activeLinkClass : inactiveLinkClass
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-accent hover:bg-accent-dark shadow-sm transition-all duration-200 group"
                >
                  Get a Quote
                  <ArrowRight className="ml-1.5 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAdminPage && isAdminLoggedIn && (
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-mono">
                Admin
              </span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent hover:bg-primary-dark/50 focus:outline-none transition-colors duration-200 cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 max-h-0 ${
          isOpen ? "max-h-[500px] border-t border-white/10" : ""
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary-dark/95 backdrop-blur-md">
          {isAdminPage && isAdminLoggedIn ? (
            // Mobile Admin Menu
            <>
              {adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-white hover:bg-white/5 hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <button
                onClick={handleAdminLogout}
                className="w-full text-left block px-3 py-2.5 rounded-md text-base font-medium bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white"
              >
                Logout Administrative Session
              </button>
            </>
          ) : (
            // Mobile Public Menu
            <>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-white hover:bg-white/5 hover:text-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 pb-2 px-3">
                <Link
                  href="/quote"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent-dark shadow-sm transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
