import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blog/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="post-list-container">
    <h1>All Posts</h1>
    <div className="card-container">
      {posts.map(post => (
        <div key={post._id} className="card">
          <h2>{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
          <p className="author">By: {post.author}</p>
          <Link to={`/posts/${post._id}`} className="btn">Read More</Link>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PostList;
