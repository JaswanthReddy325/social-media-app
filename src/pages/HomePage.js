// src/pages/HomePage.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        {user ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName}</h1>
            <Feed />
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold">Please log in to see the feed.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
