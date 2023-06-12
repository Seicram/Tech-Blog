// TODO: Create function to handle the "+ New Post" button by routing the button to '/new' page for user to fill out new blog post in newFormHandler
const newPostButtonHandler = async () => {
  const response = await fetch('/new', {
    method: 'GET',
  });

  if (response.ok) {
    document.location.replace('/new');
  } else {
    alert(response.statusText);
  }
};

// TODO: Create "document" querySelector and addEventListener for newPostButtonHandlerButton
document.querySelector('#select-create-post')?.addEventListener('click', newPostButtonHandler);

