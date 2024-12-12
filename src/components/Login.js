import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";  // Import the auth object from firebase.js
import '../App.css';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [isRegistering, setIsRegistering] = useState(false); // Toggle for register/login view

  // Handle email login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      // Redirect the user to the home page or feed after login
      // Example: window.location.href = "/home";
    } catch (error) {
      console.error("Login Error:", error.message);
      setError("Failed to log in. Please check your credentials and try again.");
    }
  };

  // Handle register (sign up)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      // Redirect the user to the home page or feed after registration
      // Example: window.location.href = "/home";
    } catch (error) {
      console.error("Registration Error:", error.message);
      setError("Failed to register. Please try again.");
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Forgot Password Error:", error.message);
      setError("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 login-container">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isRegistering ? "Register" : "Log In"}</h2>

        {/* Form for Login/Register */}
        <form onSubmit={isRegistering ? handleRegister : handleEmailLogin}>
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
            {isRegistering ? "Register" : "Log In"}
          </button>
        </form>

        {/* Forgot Password option */}
        {!isRegistering && (
          <div className="mt-4 text-center">
            <button onClick={handleForgotPassword} className="text-blue-500 text-sm">
              Forgot Password?
            </button>
          </div>
        )}

        {/* Switch between Register and Login */}
        <div className="mt-4 text-center">
          <p>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-500 cursor-pointer"
            >
              {isRegistering ? "Login" : "Register"}
            </span>
          </p>
        </div>

        {/* Google login button */}
        {!isRegistering && (
          <div className="mt-4 text-center">
            <p>Or log in with:</p>
            <button onClick={login} className="w-full mt-2 bg-red-500 text-white p-2 rounded">
              Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

