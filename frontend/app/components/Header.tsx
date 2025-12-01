"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth"; // adjust path if needed

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    // Use router.push for smooth navigation without full page reload
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / Title */}
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
          aria-label="Toggle menu"
        >
          <span className="text-3xl">☰</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-gray-700 items-center">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/post" className="hover:text-red-600 transition-colors">
                Create Post
              </Link>
              <Link href="/profile" className="hover:text-red-600 transition-colors">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 font-medium hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-red-600 transition-colors">
                Login
              </Link>
              <Link href="/register" className="hover:text-red-600 transition-colors">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 flex flex-col px-4 pb-4 space-y-2 text-gray-700">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="py-2 hover:text-red-600 transition-colors"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/post"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Create Post
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left py-2 text-red-600 font-medium hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="py-2 hover:text-red-600 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}