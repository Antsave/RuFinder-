import React, { useState } from "react";

export default function PostForm({ onPostSubmit }) {
  const [type, setType] = useState("Lost");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      type,
      location,
      description,
      image: image ? URL.createObjectURL(image) : null,
      comments: [],
    };
    onPostSubmit(newPost);
    setType("Lost");
    setLocation("");
    setDescription("");
    setImage(null);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <label>Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>Lost</option>
        <option>Found</option>
      </select>

      <label>Location</label>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">Select Location</option>
        <option>BSB</option>
        <option>Library</option>
        <option>Nursing Building</option>
        <option>CC</option>
        <option>ATG</option>
        <option>Other</option>
      </select>

      <label>Description</label>
      <textarea
        placeholder="Please describe the found/lost item and list any other details you want to share"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label>Upload Image</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Submit</button>
    </form>
  );
}
