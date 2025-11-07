// This directive MUST be at the very top of the file
"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo or Title */}
        <div className="flex items-center space-x-2">
          <img
            src="/main%20logo.png"
            alt="RU Finder Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold text-red-600">RU Finder</h1>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-red-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-3xl">☰</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 flex flex-col px-4 pb-4 space-y-2 text-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
          <Link href="/register" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </nav>
      )}
    </header>
  );
}