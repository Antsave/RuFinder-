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
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-lg backdrop-blur-sm z-50 sticky top-0">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/main%20logo.png"
            alt="RU Finder Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold text-white tracking-wide">
            RU Finder
          </h1>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white focus:outline-none hover:text-gray-200 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-3xl">☰</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            href="/"
            className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/post"
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Create Post
              </Link>
              <Link
                href="/profile"
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden bg-gradient-to-r from-red-600 to-red-700 border-t border-red-800 transition-max-height duration-500 overflow-hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                href="/post"
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Create Post
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="text-white font-medium hover:text-gray-200 transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
