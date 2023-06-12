// TODO: Set up async event for 'loginFormHandler'
const loginFormHandler = async (event) => {
    event.preventDefault();

    // TODO: Set up querySelectors for login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // TODO: Send POST request to API endpoint
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // TODO: Redirect the browser to the user's view of user's dashboard page (if user login is successful)
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};
// ______________________________________________________________
// TODO: Set up async event for 'signupFormHandler'
const signupFormHandler = async (event) => {
    event.preventDefault();

    // TODO: Set up querySelectors for signup form
    const selectedUsername = document.querySelector('#username-signup').value.trim();
    const selectedEmail = document.querySelector('#email-signup').value.trim();
    const selectedPassword = document.querySelector('#password-signup').value.trim();
    const newUser = {
        username: selectedUsername,
        email: selectedEmail,
        password: selectedPassword
    }
    console.log(newUser)
    // TODO: Send POST request to API endpoint
    fetch("/api/users/", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }

    }).then(res => {
        if (res.ok) {
            console.log("user is signed up")
            // TODO: Redirect the browser to the user's view of user's dashboard page (if user signup is successful)
            document.location.replace('/dashboard')
        } else {
            alert("please try again")
        }
    })
}
// ______________________________________________________________
// TODO: Create "document" querySelector and addEventListener for loginFormHandler (through submit button)
document
    .querySelector('#login-form')?.addEventListener('submit', loginFormHandler);

// TODO: Create "document" querySelector and addEventListener for signupFormHandler (through submit button)
document
    .querySelector('#signup-form')?.addEventListener('submit', signupFormHandler);