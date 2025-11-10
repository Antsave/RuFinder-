"use client";

import { useState, useEffect } from "react";

interface AuthHook {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export default function useAuth(): AuthHook {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Load token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  // Functions to log in/out
  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}

