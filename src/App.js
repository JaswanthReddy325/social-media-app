
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { AuthProvider, useAuth } from "./context/AuthContext"; // Ensure useAuth is imported


import { AuthProvider } from "./context/AuthContext";

import './App.css';
import { auth } from "./firebase/firebase-config"; // Import auth from firebase-config
import { onAuthStateChanged } from "firebase/auth"; 

// ProtectedRoute component for private routes
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Access currentUser from context

  // If user is not authenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (protected route)
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div >
          <Routes>

            {/* Public Route for Login */}
            <Route  path="/" element={isAuthenticated ? <HomePage /> : <Login />} />
            {/* Protected Route for HomePage */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Route for ProfilePage */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            
            {/* Public Route for Signup */}
            <Route path="/signup" element={<Signup />} />
            <Route  path="" element={<Login />} />
            <Route  exact path="/" element={<HomePage />} />
            <Route  exact path="/profile" element={<ProfilePage />} />
            
            <Route  exact path="/signup" element={<Signup />} />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
