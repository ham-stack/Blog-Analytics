const {
    memoizedAnalyzeBlogData,
    memoizedSearchBlogs,
  } = require('./caching.js'); // Correct the path to your caching.js file
  
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
  
      // Attach statistics to the request object using memoized function
      req.blogStats = memoizedAnalyzeBlogData(blogData);
  
      next(); // Move to the next middleware or route
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Blog search endpoint
  app.get('/search', async (req, res) => {
    try {
      const searchTerm = req.query.q;
  
      // Search for blogs based on the query using memoized function
      const searchResults = memoizedSearchBlogs(await fetchBlogData(), searchTerm);
  
      // Example: Retrieve statistics from the request object
      const { totalPosts, averageWordCount } = req.blogStats;
  
      res.json({
        totalPosts,
        averageWordCount,
        searchResults,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Helper function to fetch blog data
  async function fetchBlogData() {
    const response = await axios.get('https://api.example.com/blog/posts'); // Replace with your API endpoint
    return response.data;
  }
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  