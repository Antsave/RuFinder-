"use client";
import { useEffect, useState } from "react";
import {authFetch} from "@/utils/authFetch";

// Typescript interface
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
      const res = await authFetch(`http://127.0.0.1:8000/api/users/me/`, {
      });
      if (!res.ok) return;
      const data: User = await res.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-left">
        Profile Information
      </h2>

      <div className="space-y-3 text-left">
        <p><span className="font-medium text-gray-700">Username:</span> {user.username}</p>
        <p><span className="font-medium text-gray-700">Email:</span> {user.email}</p>
        <p><span className="font-medium text-gray-700">First Name:</span> {user.first_name}</p>
        <p><span className="font-medium text-gray-700">Last Name:</span> {user.last_name}</p>
        <p><span className="font-medium text-gray-700">Display Name:</span> {user.display_name}</p>
      </div>
    </div>
  );
}
