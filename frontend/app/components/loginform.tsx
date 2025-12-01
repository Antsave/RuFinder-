"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
// DON'T import authFetch here - login is a public endpoint!

interface TokenResponse {
  access: string;
  refresh: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // ✅ USE REGULAR FETCH - Login is a PUBLIC endpoint (no auth required)
      const res = await fetch("http://127.0.0.1:8000/api/users/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // ← IMPORTANT: Add this header!
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Login failed");

      const tokenData: TokenResponse = data;

      // Use the login function from useAuth hook
      login(tokenData.access, tokenData.refresh);

      setMessage("Login successful! Redirecting...");

      // Small delay to show success message before redirect
      setTimeout(() => {
        router.push("/profile");
      }, 500);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-left"
    >
      {/* Header */}
      <h2 className="text-2xl font-semibold text-black mb-4 text-center">
        Welcome Back
      </h2>

      {/* Username Input */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Username:
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border-2 border-red-400 rounded-md p-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
          disabled={isLoading}
        />
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-2 border-gray-300 rounded-md p-2 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          required
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      {/* Message */}
      {message && (
        <p
          className={`mt-2 text-center text-sm ${
            message.includes("success")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}