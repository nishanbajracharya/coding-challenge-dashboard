const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', async () => {
    try {
        await axios.post('/api/users/logout');

        window.location = '/login';
    } catch(e) {
        console.log(e);
    }
});
