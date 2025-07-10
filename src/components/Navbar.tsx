"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="text-2xl font-bold text-blue-700">
        Sekolah<span className="text-green-600">Ku</span>
      </div>

      <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
        <Link href="#galeri" className="hover:text-blue-600">
          Galeri
        </Link>
        <Link href="/tentang" className="hover:text-blue-600">
          Tentang
        </Link>
        <Link href="/kontak" className="hover:text-blue-600">
          Kontak
        </Link>

        {/* Dropdown Login */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10"
              >
                <Link
                  href="/login/admin"
                  className="block px-4 py-2 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login Admin
                </Link>
                <Link
                  href="/login/siswa"
                  className="block px-4 py-2 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login Siswa
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
