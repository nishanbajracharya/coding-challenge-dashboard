const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
  try {
    logoutBtn.classList.add('is-loading');
    await axios.post('/api/users/logout');

    window.location.href = '/login';
  } catch (e) {
    console.log(e);
  } finally {
    logoutBtn.classList.remove('is-loading');
  }
});

async function updateProfileModal() {
  try {
    const response = await axios.get(`/api/users/me`);

    const fullName = response.data.data.fullName;
    const username = response.data.data.username;

    document.getElementById('update-username').value = username;
    document.getElementById('update-fullname').value = fullName;
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.getAttribute('target');
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      if (modal === 'update-profile-modal') updateProfileModal();
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});