const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to analyze blog data
app.use(async (req, res, next) => {
  try {
    // Make a request to the third-party blog API (replace with your API endpoint)
    const response = await axios.get('https://api.example.com/blog/posts');

    // Extract and analyze data (customize this part)
    const blogData = response.data;

    // Example: Calculate the total number of blog posts
    const totalPosts = blogData.length;

    // Example: Calculate the average word count of blog posts
    const wordCounts = blogData.map((post) => post.content.split(' ').length);
    const averageWordCount = _.mean(wordCounts);

    // Attach statistics to the request object
    req.blogStats = {
      totalPosts,
      averageWordCount,
    };

    next(); // Move to the next middleware or route
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Blog search endpoint
app.get('/search', (req, res) => {
  // Example: Retrieve statistics from the request object
  const { totalPosts, averageWordCount } = req.blogStats;

  // Implement your search logic here (e.g., using Lodash for filtering)
  // Replace this with your actual search code

  const searchTerm = req.query.q;
  const results = blogData.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  res.json({
    totalPosts,
    averageWordCount,
    searchResults: results,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
