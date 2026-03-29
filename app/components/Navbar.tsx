"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const ACTIVITY_LINKS = [
  { label: "Dips", href: "/dips" },
  { label: "Excursions", href: "/excursions" },
  { label: "Adventures", href: "/adventures" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Activities", href: "/dips", children: ACTIVITY_LINKS },
  { label: "Contact", href: "/contact" },
];

const WHATSAPP_URL = "https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isTransparent = !scrolled && !menuOpen;
  const isActivityPage = ["/dips", "/excursions", "/adventures"].includes(pathname);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "bg-[#e8e5e2]/95 backdrop-blur-md shadow-sm",
        ].join(" ")}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={
                  isTransparent
                    ? "/brand-assets/dipclub-logo-white.svg"
                    : "/brand-assets/dip-club-logo-blue.svg"
                }
                alt="Dip Club Amsterdam"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = link.children
                  ? isActivityPage
                  : pathname === link.href;

                if (link.children) {
                  return (
                    <div key={link.label} ref={dropdownRef} className="relative">
                      <button
                        onClick={() => setDropdownOpen((v) => !v)}
                        className={[
                          "text-sm font-medium transition-colors duration-200 relative pb-0.5 flex items-center gap-1",
                          isTransparent
                            ? "text-white hover:text-white/80"
                            : "text-dark hover:text-terracotta",
                          isActive
                            ? [
                                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-none",
                                isTransparent ? "after:bg-white" : "after:bg-terracotta",
                              ].join(" ")
                            : "",
                        ].join(" ")}
                      >
                        {link.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Dropdown */}
                      <div
                        className={[
                          "absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[160px] border border-dark/10 rounded-none overflow-hidden transition-all duration-200",
                          scrolled ? "bg-white" : "bg-[#e8e5e2]",
                          dropdownOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none",
                        ].join(" ")}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={[
                              "block px-5 py-3 text-sm font-medium transition-colors",
                              pathname === child.href
                                ? "text-terracotta"
                                : "text-dark hover:text-terracotta hover:bg-dark/5",
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={[
                      "text-sm font-medium transition-colors duration-200 relative pb-0.5",
                      isTransparent
                        ? "text-white hover:text-white/80"
                        : "text-dark hover:text-terracotta",
                      isActive
                        ? [
                            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-none",
                            isTransparent ? "after:bg-white" : "after:bg-terracotta",
                          ].join(" ")
                        : "",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "ml-2 px-5 py-2 rounded-none text-sm font-semibold transition-all duration-200",
                  isTransparent
                    ? "bg-white text-dark hover:bg-white/90"
                    : "bg-terracotta text-white hover:bg-terracotta-dark",
                ].join(" ")}
              >
                Join Community
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-0 focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className={[
                  "block w-6 h-0.5 transition-all duration-300 origin-center",
                  isTransparent && !menuOpen ? "bg-white" : "bg-dark",
                  menuOpen ? "translate-y-[3px] rotate-45" : "-translate-y-[4px]",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-6 h-0.5 transition-all duration-300",
                  isTransparent && !menuOpen ? "bg-white" : "bg-dark",
                  menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
                ].join(" ")}
              />
              <span
                className={[
                  "block w-6 h-0.5 transition-all duration-300 origin-center",
                  isTransparent && !menuOpen ? "bg-white" : "bg-dark",
                  menuOpen ? "-translate-y-[3px] -rotate-45" : "translate-y-[4px]",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-[#e8e5e2] flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center gap-6">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <div key={link.label} className="flex flex-col items-center gap-3">
                  <span className="text-2xl font-semibold text-dark/50">{link.label}</span>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={[
                        "text-xl font-medium transition-colors duration-200",
                        pathname === child.href ? "text-terracotta" : "text-dark hover:text-terracotta",
                      ].join(" ")}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "text-2xl font-semibold transition-colors duration-200",
                  pathname === link.href ? "text-terracotta" : "text-dark hover:text-terracotta",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 rounded-none bg-terracotta text-white text-base font-semibold hover:bg-terracotta-dark transition-colors duration-200"
          >
            Join WhatsApp Community
          </a>
        </nav>
      </div>
    </>
  );
}
