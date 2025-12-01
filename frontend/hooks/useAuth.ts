"use client";

import { useState, useEffect } from "react";

interface AuthHook {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

// Custom event for auth state changes
const AUTH_CHANGE_EVENT = "authStateChange";

export default function useAuth(): AuthHook {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);

    // Listen for auth state changes from other components
    const handleAuthChange = () => {
      const currentToken = localStorage.getItem("accessToken");
      setIsAuthenticated(!!currentToken);
    };

    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    };
  }, []);

  // Login function - stores tokens and updates state
  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsAuthenticated(true);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  // Logout function - removes tokens and updates state
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);

    // Dispatch event to notify other components
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  };

  return { isAuthenticated, setIsAuthenticated, login, logout };
}