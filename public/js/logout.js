// Logout function to send request to log out the user
const Logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/'); 
  } else {
    alert('Failed to log out.'); 
  }
};

const LogoutButton = document.querySelector('#logout');
if (LogoutButton) {
  LogoutButton.addEventListener('click', Logout);
}