// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created

// TODO: Set up async event for 'commentFormHandler'
const commentFormHandler = async (event) => {
    event.preventDefault();

    // TODO: Set up querySelectors for 'comment' form
    const comment_body = document.querySelector('#add-comment').value.trim();

    const blogPost_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // TODO: Send POST request to API endpoint
    if (comment_body) {
        const postNewComment = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_body, blogPost_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(postNewComment)
        // TODO: Reload the browser to to display newly-added comment
        if (postNewComment.ok) {
            document.location.reload();
        } else {
            alert('Sorry, comment can not be created!');
        }
    }
};

// TODO: Create "document" querySelector and addEventListener for when user clicks "submit" button to add comment
document
    .querySelector('#add-comment-form').addEventListener('submit', commentFormHandler);