"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TokenResponse{
    access: string;
    refresh: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/users/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Login failed");
      else{
          const tokenData: TokenResponse = data;
            localStorage.setItem("accessToken", tokenData.access);
            localStorage.setItem("refreshToken", tokenData.refresh);
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setMessage("Login successful!");
      router.push("/profile");
    } catch (err: unknown) {
        if (err instanceof Error){
            setMessage(err.message);
        }
        setMessage('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
