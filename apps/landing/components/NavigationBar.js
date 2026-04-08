"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="#" className="text-xl font-semibold">ReviewMyAgent</Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm hover:opacity-70">Features</a>
            <a href="#connect" className="px-4 py-2 rounded-xl bg-[#8B5CF6] text-white text-sm whitespace-nowrap">Stay Updated</a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-sm" onClick={() => setOpen(false)}>Features</a>
            <a href="#connect" className="text-sm" onClick={() => setOpen(false)}>Stay Updated</a>
          </div>
        </div>
      )}
    </nav>
  );
}
