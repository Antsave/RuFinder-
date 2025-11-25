"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load auth state from localStorage and listen for changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    };

    // Initial check
    checkToken();

    // Listen for storage changes (multi-tab login/logout)
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <header className="bg-red-600 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/main%20logo.png"
            alt="RU Finder Logo"
            className="h-8 w-auto"
          />
          <h1 className="text-xl font-bold text-white">RU Finder</h1>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="text-3xl">☰</span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <NavLink href="/">Home</NavLink>

          {isAuthenticated ? (
            <>
              <NavLink href="/post">Create Post</NavLink>
              <NavLink href="/profile">Profile</NavLink>
              <button
                onClick={handleLogout}
                className="text-white font-medium hover:underline transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-red-600 flex flex-col px-4 pb-4 space-y-2 text-white">
          <MobileLink href="/" onClick={() => setMenuOpen(false)}>
            Home
          </MobileLink>

          {isAuthenticated ? (
            <>
              <MobileLink href="/post" onClick={() => setMenuOpen(false)}>
                Create Post
              </MobileLink>
              <MobileLink href="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </MobileLink>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left font-medium hover:underline transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <MobileLink href="/login" onClick={() => setMenuOpen(false)}>
                Login
              </MobileLink>
              <MobileLink href="/register" onClick={() => setMenuOpen(false)}>
                Register
              </MobileLink>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

// Reusable Desktop Link with hover underline
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white font-medium relative group">
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
    </Link>
  );
}

// Reusable Mobile Link
function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick} className="font-medium hover:underline transition">
      {children}
    </Link>
  );
}
