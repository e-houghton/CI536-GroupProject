window.addEventListener('load', function (e) {
    const btnBack = document.querySelector('.back-btn'),
        btnSignup = document.querySelector('.signup-btn'),
        btnLogin = document.querySelector('.login-btn'),

        inputEmail = document.querySelector('#email'),
        inputPassword = document.querySelector('#password'),

        hintEmail = document.querySelector('#email-hint'),
        hintPassword = document.querySelector('#password-hint');
        

    btnSignup.addEventListener('click', function () {
        window.location.href = 'signup.html';
    });

    btnLogin.addEventListener('click', function () {
        //LOGIN FUNCTIONALITY WHERE THEY ARE SIGNED INTO THE SYSTEM BY:
        //CHECKING IF EMAIL AND PASSWORD MATCH THE ONE ON DB
        // IF THAT THRU THEN DISPLAY, YOU HAVE BEEN SUCCESSFULLY LOGGED IN ON PAGE AND SAY HI <FIRSTNAME> IN HOME NAVBAR
    });
});

function showPassword(id, span) {
    const input = document.getElementById(id);
    const icon = span.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

