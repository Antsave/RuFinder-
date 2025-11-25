"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch("http://127.0.0.1:8000/api/users/me/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;

      const data: User = await res.json();
      setUser(data);
    };

    fetchProfile();
  }, []);

  if (!user)
    return (
      <p className="text-center text-gray-500 mt-10 animate-pulse">
        Loading profile...
      </p>
    );

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      {/* Floating Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl ring-4 ring-red-200">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-900">
          {user.display_name}
        </h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      {/* Read-only Inputs */}
      <ReadOnlyField label="Username" value={user.username} />
      <ReadOnlyField label="Email" value={user.email} />
      <ReadOnlyField label="First Name" value={user.first_name} />
      <ReadOnlyField label="Last Name" value={user.last_name} />
      <ReadOnlyField label="Display Name" value={user.display_name} />
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        value={value}
        readOnly
        className="
          w-full px-4 py-2 rounded-lg
          bg-gray-100 border border-gray-300 
          text-gray-600
          cursor-not-allowed
        "
      />
    </div>
  );
}
