"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {authFetch} from "@/utils/authFetch";

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

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file');
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setMessage('Image size must be less than 5MB');
        return;
      }

      setImage(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove selected image
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
      setMessage("You must be logged in to create a post");
      setIsLoading(false);
      return;
    }

    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("location", location);

      // Only append image if one is selected
      if (image) {
        formData.append("image", image);
      }

      const res = await authFetch(`http://127.0.0.1:8000/api/posts/`, {
        method: "POST",

        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.detail || "Failed to create post");
      }

      setMessage("Post created successfully! Redirecting...");

      // Clear form
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("L");
      setImage(null);
      setImagePreview(null);

      // Redirect after short delay
      setTimeout(() => {
        router.push("/"); // Redirect to home page
      }, 1000);

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
    <form onSubmit={handleSubmit}>
      {/* Title Input */}
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        disabled={isLoading}
      />

      {/* Description Textarea */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        disabled={isLoading}
      />

      {/* Category Select */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value as "L" | "F")}
        disabled={isLoading}
      >
        <option value="L">Lost</option>
        <option value="F">Found</option>
      </select>

      {/* Location Input */}
      <input
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        disabled={isLoading}
      />

      {/* Image Upload Section */}
      <div>
        <label htmlFor="image">Image (Optional)</label>

        {!imagePreview ? (
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
          />
        ) : (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '300px', maxHeight: '300px' }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isLoading}
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Creating Post..." : "Post"}
      </button>

      {/* Message */}
      <p>{message}</p>
    </form>
  );
}