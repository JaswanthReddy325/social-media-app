import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { AuthProvider } from "./context/AuthContext";
import './App.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        
        <div className="app-container">
          <Routes>
            <Route  path="/" element={<HomePage />} />
            <Route  path="/profile" element={<ProfilePage />} />
            <Route  path="/login" element={<Login />} />
            <Route  path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
