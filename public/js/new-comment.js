const newCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = parseInt(window.location.pathname.split('/').pop());
  
    const content = document.querySelector('#new-comment-form').value.trim();
  
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload(); 
      } else {
        alert('Failed to create a comment.');
      }
    }
  };
  
  
  
  // Event listeners
  const newCommentForm = document.querySelector('.new-comment-form');
  if (newCommentForm) {
    newCommentForm.addEventListener('submit', newCommentFormHandler);
  }