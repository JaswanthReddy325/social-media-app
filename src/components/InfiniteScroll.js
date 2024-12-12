// src/components/InfiniteScroll.js
import React, { useEffect, useRef, useState } from "react";
import '../App.css';
const InfiniteScroll = ({ fetchMorePosts }) => {
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        setLoading(true);
        fetchMorePosts(() => setLoading(false));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, fetchMorePosts]);

  return <div>{loading && <p>Loading more posts...</p>}</div>;
};

export default InfiniteScroll;
