// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const BlogList = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get('/api/blog')
//       .then(response => setPosts(response.data))
//       .catch(error => console.error(error));
//   }, []);

//   return (
//     <div>
//       <h2>All Blog Posts</h2>
      
//       {/* Add Create Post Button */}
//       <Link to="/create">
//         <button>Create New Post</button>
//       </Link>

//       {posts.map(post => (
//         <div key={post._id}>
//           <h3>{post.title}</h3>
//           <p>{post.content.substring(0, 100)}...</p>
//           <Link to={`/post/${post._id}`}>Read More</Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BlogList;
