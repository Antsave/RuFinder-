"use client";

import { useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState( () => {
      const token = localStorage.getItem('accessToken');
      return !!token;
  });


  return { isAuthenticated, setIsAuthenticated };
}
