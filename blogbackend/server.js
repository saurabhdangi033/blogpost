// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const blogRoutes = require('./routes/blogRoutes');

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware to parse JSON
// app.use(express.json());
// app.use(cors());

// // Blog Routes
// app.use('/api/blog', blogRoutes);

// mongoose.connect('mongodb+srv://saurabhdangi03:IjOa0VNWNTMKKuAs@cluster0.gxg8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// app.listen(port, () => console.log(`Server running on port ${port}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/blog', blogRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
