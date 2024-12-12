import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase-config'; // Ensure you are importing both db and storage correctly
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Post from './Post';
import '../App.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch posts from Firestore
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(20));
      const querySnapshot = await getDocs(q);
      setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  // Handle file selection (image or video)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle post submission (upload file and text to Firestore)
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    let fileURL = '';

    if (file) {
      // Create a reference to the file in Firebase Storage
      const fileRef = ref(storage, `posts/${Date.now()}_${file.name}`);

      // Upload the file
      const uploadTask = uploadBytesResumable(fileRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can show the upload progress here
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          // Handle upload errors
          console.error('Upload Error:', error);
          setLoading(false); // Set loading state to false in case of error
        },
        async () => {
          // Once the upload is complete, get the file URL
          fileURL = await getDownloadURL(uploadTask.snapshot.ref());
          await createPost(fileURL); // Create the post with the file URL
        }
      );
    } else {
      // If no file is selected, create the post without a file
      await createPost(fileURL);
    }
  };

  // Create a post in Firestore
  const createPost = async (fileURL) => {
    try {
      await addDoc(collection(db, 'posts'), {
        text: postText,
        mediaURL: fileURL, // Store the file URL in Firestore
        mediaType: file ? file.type.split('/')[0] : 'none', // Determine if the file is an image or video
        timestamp: serverTimestamp(), // Timestamp for sorting posts
      });
      setPostText(''); // Clear the post text
      setFile(null); // Clear the selected file
      setLoading(false); // Set loading state to false after the post is created
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  return (
    <div className="feed-container">
      {/* Post Form */}
      <div className="post-form">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
          rows="4"
          className="w-full p-2 border rounded"
        />
        <div className="file-input">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          onClick={handlePostSubmit}
          className="submit-btn"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Posting...' : 'Post'} {/* Change button text based on loading state */}
        </button>
      </div>

      {/* Displaying Posts */}
      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
