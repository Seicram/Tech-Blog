document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Perform logout logic
      // ...
    });
  }

  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
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
  }
});
