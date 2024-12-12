// src/components/Navbar.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import '../App.css';
const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 nav-menu-container">
      <div className="container mx-auto flex justify-between">
        
        <div>
          {user ? (
            <>
              <a href="/profile" className="mr-4">Profile</a>
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <h1 className="nav-menu">Please Login...</h1>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
