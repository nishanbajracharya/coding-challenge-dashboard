const loginBtn = document.getElementById('login-btn');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  loginError.classList.add('hide');
  loginBtn.innerText = 'Logging in';
  loginBtn.setAttribute('aria-busy', 'true');

  try {
    await axios.post('/api/users/login', {
      email, password
    });
    // Redirect to home
    window.location.href = '/';
  } catch (e) {
    loginError.classList.remove('hide');
    
    if (e.message) {
      loginError.innerText = e.message;
    }
  } finally {
    loginBtn.innerText = 'Login';
    loginBtn.setAttribute('aria-busy', 'false');
  }
});
