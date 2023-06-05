// Handle comment submission
const commentForm = document.getElementById('comment-form');
if (commentForm) {
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const postId = commentForm.getAttribute('data-post-id');
    const commentInput = document.getElementById('comment-input');
    const comment = commentInput.value.trim();

    if (comment) {
      try {
        const response = await fetch(`/post/${postId}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment }),
        });

        if (response.ok) {
          location.reload();
        } else {
          console.error('Error submitting comment:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  });
}
