const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await axios.post('/api/users/login', {
      email, password
    });
    // Redirect to home
    window.location = '/';
  } catch (e) {
    console.log(e);
  }
});
