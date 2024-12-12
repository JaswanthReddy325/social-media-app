// src/components/Profile.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import '../App.css';
const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "");

  const handleSave = () => {
    // Save updated bio to Firestore or your backend.
    setEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-center">
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-bold">{user.displayName}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Bio</h3>
        {editing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded p-2"
          />
        ) : (
          <p>{bio || "No bio available."}</p>
        )}
        {editing ? (
          <button onClick={handleSave} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="mt-2 px-4 py-2 bg-gray-300 rounded">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
