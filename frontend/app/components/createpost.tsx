"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/utils/authFetch";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"L" | "F">("L");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be under 5MB.");
      return;
    }

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMessage("You must be logged in to create a post.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);
      if (image) formData.append("image", image);

      const res = await authFetch("http://127.0.0.1:8000/api/posts/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.detail || "Failed to create post.");
      }

      setMessage("Post created! Redirecting...");
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("L");
      setImage(null);
      setImagePreview(null);

      setTimeout(() => router.push("/"), 1000);
    } catch (err: any) {
      setMessage(err.message || "Unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Outer Border Container */}
      <div className="border-2 border-gray-300 rounded-2xl shadow-lg p-8 bg-white">
        
        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="space-y-2 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <label className="text-base font-semibold text-gray-800">Title</label>
            <input
              placeholder="Short title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         bg-white placeholder:text-gray-400
                         focus:border-red-500 focus:ring-2 focus:ring-red-200
                         transition disabled:bg-gray-100"
            />
          </div>

          {/* Description */}
          <div className="space-y-2 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <label className="text-base font-semibold text-gray-800">Description</label>
            <textarea
              placeholder="Describe the item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         bg-white placeholder:text-gray-400 min-h-[150px]
                         focus:border-red-500 focus:ring-2 focus:ring-red-200
                         transition disabled:bg-gray-100"
            />
          </div>

          {/* Category */}
          <div className="space-y-2 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <label className="text-base font-semibold text-gray-800">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as "L" | "F")}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         bg-white focus:border-red-500 focus:ring-2 
                         focus:ring-red-200 transition disabled:bg-gray-100"
            >
              <option value="L">Lost</option>
              <option value="F">Found</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <label className="text-base font-semibold text-gray-800">Location</label>
            <input
              placeholder="Where was it lost or found?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         bg-white placeholder:text-gray-400
                         focus:border-red-500 focus:ring-2 focus:ring-red-200
                         transition disabled:bg-gray-100"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2 p-5 border border-gray-200 rounded-xl bg-gray-50">
            <label className="text-sm font-semibold text-gray-800">Image (Optional)</label>
            {!imagePreview ? (
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="block w-full text-sm text-gray-700
                           file:bg-red-600 file:text-white file:border-0 
                           file:px-4 file:py-2 file:rounded-lg
                           hover:file:bg-red-700 transition
                           cursor-pointer disabled:opacity-60"
              />
            ) : (
              <div className="space-y-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-w-xs rounded-xl shadow border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg
                             hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold
                       shadow-md hover:bg-red-700 hover:shadow-lg transition
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating..." : "Create Post"}
          </button>

          {message && (
            <p className="text-center text-sm font-medium text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
