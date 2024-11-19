const signupBtn = document.getElementById('signup-btn');
const signupForm = document.getElementById('signup-form');
const signupError = document.getElementById('signup-error');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const passcode = document.getElementById('signup-passcode').value;

  signupError.classList.add('is-hidden');
  signupBtn.classList.add('is-loading');

  try {
    await axios.post('/api/users/signup', {
      email, password, passcode
    });
    // Redirect to home
    window.location.href = '/';
  } catch (e) {
    signupError.classList.remove('is-hidden');

    if (e.message) {
      signupError.innerText = e.message;
    }
  } finally {
    signupBtn.classList.remove('is-loading');
  }
});
