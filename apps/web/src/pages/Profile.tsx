// apps/web/src/components/Profile.tsx
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:4000/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="space-y-3">
          <p>
            <span className="font-semibold text-gray-700">Email: </span>
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}