const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/api/users/login', {
    body: JSON.stringify({
      email,
      password,
    }),
    method: 'POST',
  });

  if (response.status !== 200) {
    // throw error
    console.log(await response.json());
  } else {
    // Redirect to home
    window.location = '/';
  }
});
