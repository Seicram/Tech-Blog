// JavaScript code for your application

// Simulated data for blog posts
const blogPosts = [
    { title: 'First Blog Post', content: 'This is the content of the first blog post.' },
    { title: 'Second Blog Post', content: 'This is the content of the second blog post.' },
  ];
  
  // Function to display blog posts on the homepage
  function displayBlogPosts() {
    const blogPostsDiv = document.getElementById('blogPosts');
  
    // Clear the existing content
    blogPostsDiv.innerHTML = '';
  
    // Iterate through the blog posts and create HTML elements for each
    blogPosts.forEach((post) => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('blog-post');
  
      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;
  
      const contentElement = document.createElement('p');
      contentElement.textContent = post.content;
  
      postDiv.appendChild(titleElement);
      postDiv.appendChild(contentElement);
  
      blogPostsDiv.appendChild(postDiv);
    });
  }
  
  // Function to fetch blog posts from the server
  function fetchBlogPosts() {
    // Simulated API call to fetch blog posts
    setTimeout(() => {
      // Once the API call is complete, display the blog posts on the homepage
      displayBlogPosts();
    }, 1000);
  }
  
  // Function to handle initial page load
  function init() {
    // Check if the user is on the dashboard page or the homepage
    const isDashboard = window.location.pathname === '/dashboard';
  
    if (isDashboard) {
      const dashboardContentDiv = document.getElementById('dashboardContent');
      dashboardContentDiv.textContent = 'Welcome to the dashboard!'; // Simulated dashboard content
    } else {
      fetchBlogPosts();
    }
  }
  
  // Call the init function when the page loads
  window.addEventListener('load', init);
  