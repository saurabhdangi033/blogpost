import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import UpdatePost from './components/UpdatePost';
import Navbar from './components/Navbar';
import './App.css'


const App = () => {
  return (
    <div>
      <Navbar />
      {/* <h1>Blog Website</h1>
      <h3>Write Your Thoughts...</h3> */}
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/update/:id" element={<UpdatePost />} />
      </Routes>
    </div>
  );
};

export default App;
