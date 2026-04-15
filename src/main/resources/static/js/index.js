const user = JSON.parse(sessionStorage.getItem('user'));
if (user) {
    const signInBtn = document.getElementById('sign-in-btn');
    signInBtn.textContent = `Hi ${user.customer.fname}`;
    signInBtn.href = '#';
}
