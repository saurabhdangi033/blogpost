const express = require('express');
const BlogPost = require('../BlogPost');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the current date to the filename
  }
});

const upload = multer({ storage });

// Create a new blog post
router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({
      title,
      content,
      author,
      image: req.file ? req.file.filename : null // Save image file name if uploaded
    });
    
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.use('/uploads', express.static('uploads'));

// Get all blog posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single blog post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog post by ID
// router.put('/posts/:id', async (req, res) => {
//   try {
//     const { title, content, author } = req.body;
//     const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, { title, content, author }, { new: true });
//     if (!updatedPost) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.put('/posts/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // If a new image is uploaded, delete the old image file
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads', post.image);
      if (post.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      post.image = req.file.filename; // Update with new image file name
    }

    post.title = title;
    post.content = content;
    post.author = author;
    
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Delete a blog post by ID
// router.delete('/posts/:id', async (req, res) => {
//   try {
//     const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
//     if (!deletedPost) {
//       return res.status(404).json({ error: 'Post not found' });
//     }
//     res.status(200).json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // If the post has an image, delete it from the file system
    if (post.image) {
      const imagePath = path.join(__dirname, '../uploads', post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Post and image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
