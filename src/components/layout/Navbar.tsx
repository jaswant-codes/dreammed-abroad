"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ChevronDown, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-md py-2"
          : "bg-white/0 py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group gap-3">
            <Image 
              src="/logo.png" 
              alt="DreamMed Abroad Logo" 
              width={44} 
              height={44} 
              className="h-11 w-11 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform duration-300 border border-white/10"
              priority
            />
            <div className="flex flex-col">
              <span className={`font-bold text-xl leading-none tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-navy" : "text-white"
              }`}>
                DreamMed
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mt-0.5 transition-colors duration-300 ${
                isScrolled ? "text-sky" : "text-sky-light"
              }`}>
                Abroad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() =>
                  link.children ? setOpenDropdown(link.label) : undefined
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                      isScrolled
                        ? "text-text-secondary hover:text-navy hover:bg-sky-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      )
                    }
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isScrolled
                        ? "text-text-secondary hover:text-navy hover:bg-sky-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-border-light overflow-hidden"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-text-secondary hover:text-navy hover:bg-sky-50 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link href="/apply" className="hidden sm:block">
              <Button className="bg-navy hover:bg-navy-light text-white rounded-full px-6 font-semibold text-sm shadow-md hover:shadow-lg transition-all">
                Apply Now
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled ? "hover:bg-sky-50" : "hover:bg-white/10"
              }`}>
                <Menu className={`w-5 h-5 transition-colors ${
                  isScrolled ? "text-navy" : "text-white"
                }`} />
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border-light">
                    <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                      <Image 
                        src="/logo.png" 
                        alt="DreamMed Abroad Logo" 
                        width={36} 
                        height={36} 
                        className="h-9 w-9 object-contain rounded-full shadow-sm border border-border-light"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-lg leading-none tracking-tight text-navy">
                          DreamMed
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] mt-0.5 text-sky">
                          Abroad
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="p-1 rounded-lg hover:bg-gray-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Links */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {NAV_LINKS.map((link) => (
                      <div key={link.label}>
                        {link.children ? (
                          <>
                            <button
                              className="flex items-center justify-between w-full px-6 py-3 text-sm font-medium text-text-primary hover:bg-sky-50 transition-colors"
                              onClick={() =>
                                setMobileDropdownOpen(!mobileDropdownOpen)
                              }
                            >
                              {link.label}
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                  mobileDropdownOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <AnimatePresence>
                              {mobileDropdownOpen && (
                                <motion.div
                                  initial={{ height: 0 }}
                                  animate={{ height: "auto" }}
                                  exit={{ height: 0 }}
                                  className="overflow-hidden bg-sky-50/50"
                                >
                                  {link.children.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      className="block px-10 py-2.5 text-sm text-text-secondary hover:text-navy transition-colors"
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className="block px-6 py-3 text-sm font-medium text-text-primary hover:bg-sky-50 transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-4 border-t border-border-light">
                    <Link href="/apply" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-navy hover:bg-navy-light text-white rounded-full font-semibold">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
