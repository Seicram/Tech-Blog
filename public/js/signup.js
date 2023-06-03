
const SignupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/sign-up', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/'); 
    } else {
      alert('Failed to sign up.'); 
    }
  }
};

// Event listener
const SignupForm = document.querySelector('.signup-form');
if (SignupForm) {
  SignupForm.addEventListener('submit', SignupFormHandler);
}