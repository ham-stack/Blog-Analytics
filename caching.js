const _ = require('lodash');

// Define the caching duration in milliseconds (e.g., 60000 milliseconds = 1 minute)
const CACHE_DURATION = 60000;

// Helper function to analyze blog data
function analyzeBlogData(data) {
  const totalBlogs = data.length;

  const longestBlog = _.maxBy(data, (blog) => blog.title.length);
  const longestBlogTitle = longestBlog.title;

  const privacyBlogs = data.filter((blog) => blog.title.toLowerCase().includes('privacy'));
  const uniqueTitles = _.uniq(data.map((blog) => blog.title));

  return {
    totalBlogs,
    longestBlogTitle,
    privacyBlogsCount: privacyBlogs.length,
    uniqueTitles,
  };
}

// Helper function to search for blogs based on a query
function searchBlogs(data, query) {
  query = query.toLowerCase();
  return data.filter((blog) => blog.title.toLowerCase().includes(query));
}

// Memoize the analyzeBlogData function with a cache duration of CACHE_DURATION milliseconds
const memoizedAnalyzeBlogData = _.memoize(analyzeBlogData, () => 'blog-stats', CACHE_DURATION);

// Memoize the searchBlogs function with a cache duration of CACHE_DURATION milliseconds
const memoizedSearchBlogs = _.memoize(searchBlogs, (query) => `blog-search:${query}`, CACHE_DURATION);

module.exports = {
  memoizedAnalyzeBlogData,
  memoizedSearchBlogs,
};
module.exports = {
    memoizedAnalyzeBlogData,
    memoizedSearchBlogs,
  };
  