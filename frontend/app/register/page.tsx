"use client";

import RegisterForm from "../components/registerform";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50">
      {/* Centered Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center border border-gray-100">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          RU Finder
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Create Your Account
        </h2>

        {/* Register Form */}
        <RegisterForm />

        {/* Footer link */}
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
