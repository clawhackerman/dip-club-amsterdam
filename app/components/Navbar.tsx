"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Dips", href: "/dips" },
  { label: "Excursions", href: "/excursions" },
  { label: "Adventures", href: "/adventures" },
];

const WHATSAPP_URL = "https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    handleScroll(); // run on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isTransparent = !scrolled && !menuOpen;

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm",
        ].join(" ")}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
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

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
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
                            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full",
                            isTransparent ? "after:bg-white" : "after:bg-terracotta",
                          ].join(" ")
                        : "",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={[
                  "ml-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
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

      {/* Mobile full-screen overlay menu */}
      <div
        className={[
          "fixed inset-0 z-40 bg-white flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "text-3xl font-semibold transition-colors duration-200",
                  isActive ? "text-terracotta" : "text-dark hover:text-terracotta",
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
            className="mt-4 px-8 py-3 rounded-full bg-terracotta text-white text-base font-semibold hover:bg-terracotta-dark transition-colors duration-200"
          >
            Join WhatsApp Community
          </a>
        </nav>
      </div>
    </>
  );
}
