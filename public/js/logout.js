// TODO: Create "document" querySelector and addEventListener for when user clicks "logout" option
const logoutButtonHandler = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  // Redirects to homepage (homeRoutes) once user clicks logout option
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

// TODO: Create "document" querySelector and addEventListener for logoutButton
document.querySelector('#logout').addEventListener('click', logoutButtonHandler);