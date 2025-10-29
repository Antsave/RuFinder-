"use client";
import { useEffect, useState } from "react";

//Typescript interface
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
      const res = await fetch(`http://127.0.0.1:8000/api/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data: User = await res.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Display Name: {user.display_name}</p>
    </div>
  );
}
