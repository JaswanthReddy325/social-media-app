// src/components/Post.js


import React from 'react';
import '../App.css';

const Post = ({ post }) => {
  return (
    <div className="post-card">
      <p>{post.text}</p>
      {post.mediaType === 'image' && post.mediaURL && (
        <img
          src={post.mediaURL}
          alt="Post Media"
          className="w-full h-auto mt-2 rounded"
          loading="lazy"
        />
      )}
      {post.mediaType === 'video' && post.mediaURL && (
        <video controls className="w-full mt-2 rounded">
          <source src={post.mediaURL} type="video/mp4" />
        </video>
      )}
      <small className="text-gray-500">
        {post.timestamp && new Date(post.timestamp.toDate()).toLocaleString()}
      </small>
    </div>
  );
};

export default Post;
