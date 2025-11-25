"use client";

import Profile from "../components/Profile";

export default function ProfilePage() {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="
        w-full max-w-lg bg-white rounded-2xl p-10 
        shadow-[0_0_25px_rgba(0,0,0,0.1)] border border-gray-200 
        transform transition-all hover:shadow-[0_0_40px_rgba(255,0,0,0.25)]
      ">
        
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Who <span className="text-red-600 drop-shadow-sm">RU?</span>
        </h1>

        <Profile />

        <p className="mt-8 text-center text-gray-600 text-sm">
          Done?{" "}
          <a
            href="/login"
            className="text-red-600 font-semibold hover:underline hover:text-red-700 transition"
          >
            Logout
          </a>
        </p>
      </div>
    </div>
  );
}


