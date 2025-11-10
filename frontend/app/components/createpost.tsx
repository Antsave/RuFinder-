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
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("L");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      }
      setMessage("An unexpected error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-red-50 p-6 rounded-2xl border border-red-200 shadow-inner"
    >
      <h2 className="text-2xl font-bold text-red-700 text-center">Create Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 border border-red-200 bg-white focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-3xl px-4 py-3 border border-red-200 bg-white focus:ring-2 focus:ring-red-300 focus:outline-none transition-all resize-none"
        rows={3}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as "L" | "F")}
        className="w-full rounded-full px-4 py-2 border border-red-200 bg-white focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
      >
        <option value="L">Lost</option>
        <option value="F">Found</option>
      </select>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full rounded-full px-4 py-2 border border-red-200 bg-white focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
      />

      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2.5 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Post
      </button>

      <p
        className={`text-center font-medium ${
          message.includes("created") ? "text-green-600" : "text-red-600"
        }`}
      >
        {message}
      </p>
    </form>
  );
}

