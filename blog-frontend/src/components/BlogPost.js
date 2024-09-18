// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';

// const BlogPost = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     axios.get(`/api/blog/${id}`)
//       .then(response => setPost(response.data))
//       .catch(error => console.error(error));
//   }, [id]);

//   return (
//     <div>
//       {post ? (
//         <>
//           <h2>{post.title}</h2>
//           <p>{post.content}</p>
//           <p><strong>Author:</strong> {post.author}</p>
//           <Link to="/">Back to Posts</Link>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default BlogPost;
