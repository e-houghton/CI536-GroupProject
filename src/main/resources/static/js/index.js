window.addEventListener('load', function (e) {
    const btnCreateListing = document.querySelector('.create-listing-btn')
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const signInBtn = document.getElementById('sign-in-btn');
        signInBtn.textContent = `Hi ${user.customer.fname}`;
        signInBtn.href = '#';
    }

    btnCreateListing.addEventListener('click', checkSigninStatus);

    function checkSigninStatus(e) {
        e.preventDefault();

        if (!user) {
            sessionStorage.setItem('redirectAfterLogin', 'create-listing.html');
            window.location.href = 'login.html';
        }
        else {
            window.location.href = 'create-listing.html'
        }
    }


});

