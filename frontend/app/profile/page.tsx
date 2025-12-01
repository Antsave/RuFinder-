// app/login/page.tsx
"use client";

import Profile from "../components/Profile";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Who <span className="text-red-600">R U?</span>
        </h1>

        {/* Reusable form component */}
        <Profile />

      </div>
    </div>
  );
}
