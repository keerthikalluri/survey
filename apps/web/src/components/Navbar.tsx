import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">
        Waterlily Survey
      </Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/" className="hover:underline">
              Survey
            </Link>
            <Link to="/review" className="hover:underline">
              Review
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="ml-3 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}