import CreatePost from "../components/createpost";

export default function CreatePostPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Create a Post</h1>

        <div className="space-y-4">
          {/* The CreatePost component will render here */}
          <CreatePost />
        </div>
      </div>
    </div>
  );
}

// Alternative: Add custom styling to the form inputs
// You can add these styles to make the form look better:

/*
Add this CSS to your global styles or as a module:

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #374151;
}

form input:focus,
form textarea:focus,
form select:focus {
  outline: none;
  border-color: #dc2626;
  ring: 2px;
  ring-color: #dc2626;
}

form button[type="submit"] {
  width: 100%;
  background-color: #dc2626;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

form button[type="submit"]:hover:not(:disabled) {
  background-color: #b91c1c;
}

form button[type="submit"]:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

form textarea {
  min-height: 120px;
  resize: vertical;
}
*/