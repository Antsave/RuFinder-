"use client";

import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"L" | "F">("L");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Handle image selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You must be logged in to post.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      if (image) formData.append("image", image);

      // Debug: check FormData keys
      formData.forEach((value, key) => console.log(key, value));

      const res = await fetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Do NOT set Content-Type here
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to create post");
      }

      setMessage("Post created successfully!");
      setTitle("");
      setDescription("");
      setCategory("L");
      setLocation("");
      setImage(null);
      setPreview(null);
    } catch (err: unknown) {
      if (err instanceof Error) setMessage(err.message);
      else setMessage("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-red-50 p-6 rounded-2xl border border-red-200 shadow-inner"
    >
      <h2 className="text-2xl font-bold text-red-600 text-center">
        Create Post
      </h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-full px-4 py-2 border border-red-200 bg-white focus:ring-2 focus:ring-red-300 focus:outline-none transition-all"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded-3xl px-4 py-3 border border-red-200 bg-white focus:ring-2 focus:ring-red-300 focus:outline-none transition-all resize-none"
        rows={3}
        required
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
        required
      />

      {/* Image Upload & Preview */}
      <div className="flex flex-col items-center">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-xl mb-2 border border-red-200"
          />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full py-2.5 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Post
      </button>

      {message && (
        <p
          className={`text-center font-medium ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}


