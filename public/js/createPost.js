// WHEN I click on the button to add a new blog post
// THEN I am prompted to enter both a title and contents for my blog post

// newFormHandler takes in user data to create new blog post and populates the new blog post to the main dashboard page
// TODO: Set up async event for 'newFormHandler'
const newFormHandler = async (event) => {
  event.preventDefault();

  // TODO: Set up querySelectors for 'new post' form ()
  const title = document.querySelector('#create-title').value.trim();
  const contents = document.querySelector('#create-contents').value.trim();

  // TODO: Send POST request to API endpoint
  if (title && contents) {
    const response = await fetch(`/api/blogPosts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, contents }),

    });

    if (response.ok) {
      // TODO: Redirect the browser to the user's view of user's dashboard page (if user 'new post' is successful)
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new blog post!');
    }
  }
};

// TODO: Create "document" querySelector and addEventListener for when user clicks "create" option (through submit button)
document
  .querySelector('#create-post-form')?.addEventListener('submit', newFormHandler);