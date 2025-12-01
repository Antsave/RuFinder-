// utils/authFetch.ts
/**
 * Fetch wrapper with automatic JWT token refresh
 *
 * Usage:
 * import { authFetch } from "@/utils/authFetch";
 * const res = await authFetch("http://127.0.0.1:8000/api/posts/");
 */

export async function authFetch(url: string, options: RequestInit = {}) {
  let accessToken = localStorage.getItem("accessToken");

  // First attempt with current access token
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If 401 (unauthorized), try to refresh token
  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      // No refresh token - user must login
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }

    // Try to refresh the access token
    const refreshResponse = await fetch("http://127.0.0.1:8000/api/users/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();

      // Save new access token
      localStorage.setItem("accessToken", data.access);

      // If rotating refresh tokens, save new refresh token
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }

      // Retry original request with new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${data.access}`,
        },
      });
    } else {
      // Refresh failed - refresh token expired
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw new Error("Session expired. Please login again.");
    }
  }

  return response;
}

/**
 * Check if access token is expired or about to expire
 * Requires jwt-decode: npm install jwt-decode
 */
export function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  try {
    // Parse JWT token (simple base64 decode)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiresAt = payload.exp * 1000; // Convert to milliseconds
    const now = Date.now();

    // Consider expired if less than 5 minutes remaining
    return expiresAt - now < 5 * 60 * 1000;
  } catch (error) {
    console.error("Error parsing token:", error);
    return true;
  }
}

/**
 * Proactively refresh token if it's about to expire
 */
export async function refreshTokenIfNeeded(): Promise<void> {
  const accessToken = localStorage.getItem("accessToken");

  if (!isTokenExpired(accessToken)) {
    return; // Token still valid
  }

  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/api/users/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.clear();
    window.location.href = "/login";
  }
}