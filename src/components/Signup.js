import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";  // Import Firebase authentication function
import { auth } from "../firebase/firebase-config";  // Ensure you're importing the auth object from the Firebase setup
import "../App.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Define setError to manage error state

  // Handle signup logic
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create new user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      // Optionally redirect after successful registration
      // Example: window.location.href = "/home";
    } catch (error) {
      // Handle errors (e.g., email already in use, weak password)
      console.error("Signup Error:", error.message);
      setError("Failed to register. Please try again.");  // Show error message to the user
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

