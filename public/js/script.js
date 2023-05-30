// Example code for script.js

// Example code for handling user logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
  // Perform logout logic, such as making a request to the server
  // to destroy the user session or clear the local storage.
  // Redirect the user to the login page or homepage after logout.
  window.location.href = '/auth/logout';
});

// Example code for handling comment submission
const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  // Get the comment text from the form
  const commentInput = document.getElementById('comment-input');
  const comment = commentInput.value.trim();

  // Perform validation on the comment input
  if (comment === '') {
    // Show an error message if the comment is empty
    // and prevent further processing
    return;
  }

  // Make a POST request to submit the comment
  try {
    const postId = commentForm.dataset.postId; // Get the post ID from the form data attribute
    const response = await fetch(`/post/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment }),
    });

    if (response.ok) {
      // Comment submission successful, refresh the page
      window.location.reload();
    } else {
      // Handle error response from the server
    }
  } catch (error) {
    // Handle network or fetch-related errors
  }
});
