import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Number of posts per page

  useEffect(() => {
    axios.get('https://blogpost-nu-seven.vercel.app/api/blog/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Calculate the indices for posts to be shown on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="post-list-container">
      <h1>All Posts</h1>
      <div className="card-container">
        {currentPosts.map(post => (
          <div key={post._id} className="card">
            <h2>{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
            <p className="author">By: {post.author}</p>
            <Link to={`/posts/${post._id}`} className="btn">Read More</Link>
          </div>
        ))}
      </div>

     
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? 'active' : ''}>
            <button onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        <li className={currentPage === pageNumbers.length ? 'disabled' : ''}>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === pageNumbers.length}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PostList;