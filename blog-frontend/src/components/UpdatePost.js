import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/UpdatePost.css';

const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blog/posts/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setAuthor(response.data.author);
        setCurrentImage(response.data.image);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:5000/api/blog/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="update-post-container">
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit} className="update-post-form">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        
        {currentImage && (
          <div>
            <img
              src={`http://localhost:5000/uploads/${currentImage}`}
              alt="Current Post"
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
          </div>
        )}
        
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;