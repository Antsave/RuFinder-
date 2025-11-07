// app/login/page.tsx
"use client";

import LoginForm from "../components/loginform";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-2">RU Finder</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Who <span className="text-red-600">R U?</span>
        </h2>

        {/* Reusable form component */}
        <LoginForm />

        <p className="mt-6 text-sm text-gray-600">
          New here?{" "}
          <a
            href="/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Join RU Finder
          </a>
        </p>
      </div>
    </div>
  );
}
