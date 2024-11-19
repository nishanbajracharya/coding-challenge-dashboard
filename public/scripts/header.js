const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    try {
        logoutBtn.classList.add('is-loading');
        await axios.post('/api/users/logout');

        window.location.href = '/login';
    } catch(e) {
        console.log(e);
    } finally {
        logoutBtn.classList.remove('is-loading');
    }
});
