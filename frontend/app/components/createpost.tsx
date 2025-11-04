"use client";

import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"L" | "F">("L");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, category, location }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      setMessage("Post created!");
      setTitle(""); setDescription(""); setLocation(""); setCategory("L");
    } catch (err: unknown) {
        if (err instanceof Error){
            setMessage(err.message);
        }
        setMessage('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value as "L" | "F")}>
        <option value="L">Lost</option>
        <option value="F">Found</option>
      </select>
      <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
      <button type="submit">Post</button>
      <p>{message}</p>
    </form>
  );
}
