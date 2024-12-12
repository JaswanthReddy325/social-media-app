// src/pages/ProfilePage.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Post from "../components/Post";

const ProfilePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserPosts = async () => {
        const q = query(collection(db, "posts"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      };
      fetchUserPosts();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <h2 className="text-xl font-semibold">Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h1 className="text-2xl font-bold">{user.displayName}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">My Posts</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have not created any posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
