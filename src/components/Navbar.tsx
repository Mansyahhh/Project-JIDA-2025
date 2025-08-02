"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        href="/#galeri"
        className="hover:text-blue-600"
        onClick={() => setMobileMenuOpen(false)}
      >
        Galeri
      </Link>
      <Link
        href="/tentang"
        className="hover:text-blue-600"
        onClick={() => setMobileMenuOpen(false)}
      >
        Tentang
      </Link>
      <Link
        href="/kontak"
        className="hover:text-blue-600"
        onClick={() => setMobileMenuOpen(false)}
      >
        Kontak
      </Link>
      {/* Dropdown Login */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10"
            >
              <Link
                href="/login"
                className="block px-4 py-2 hover:bg-blue-50"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login Admin
              </Link>
              <Link
                href="/login"
                className="block px-4 py-2 hover:bg-blue-50"
                onClick={() => setIsDropdownOpen(false)}
              >
                Login Super Admin
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="text-2xl font-bold text-blue-700">
        <Link href="/" className="hover:text-blue-600">
          Sekolah
        </Link>
        <span className="text-green-600">Ku</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
        {navLinks}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-700"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium md:hidden"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
