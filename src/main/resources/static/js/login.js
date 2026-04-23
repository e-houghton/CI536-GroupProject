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

    btnLogin.addEventListener('click', login);

    // Removing hints when the user types into the input field again 
    document.querySelectorAll('.input-field input, .input-field select').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('invalid');
            const row = this.closest('.input-field');
            const hint = row.querySelector('.hint');
            // finds input field's hint
            if (hint) {
                hint.style.display = 'none';
            }
        });
    });


    // Allows users to log in by validating the email + password in the db
    //btnLogin.addEventListener('click', async function () {
    async function login(e) {
        e.preventDefault();
        const userEmail = inputEmail.value.trim(),
            userPassword = inputPassword.value.trim();

        let fieldsOk = true; 

        // Email and password validation
        
        if (!userEmail) {
            fieldsOk = false;
            inputEmail.classList.add('invalid');
            hintEmail.classList.remove('visible');
            hintEmail.style.display = 'inline';
        } else {
             hintEmail.style.display = '';

        }
        
        if  (!userPassword) {
            fieldsOk = false;
            inputPassword.classList.add('invalid');
            hintPassword.classList.remove('visible');
            hintPassword.style.display = 'inline';
        } else {
            hintPassword.style.display = '';
        }

        if (fieldsOk) {
         // Check the login email and password input against users in the database 
                const loginResponse = await fetch('http://localhost:8080/api/user/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: inputEmail.value.trim(),
                        password: inputPassword.value.trim(),
                    })
                });
                // Error code 401 indicates that the login input details are invalid 
                if (loginResponse.status === 401) {
                    hintEmail.textContent = 'Password or email is incorrect';
                    //hintEmail.style.display = '';
                    return;
                } 

                if (!loginResponse.ok) {
                    throw new Error('Failed to authenticate user')
                };
                const user = await loginResponse.json();

                // allows the user object to be stored and accessed during the browser session
                sessionStorage.setItem('user', JSON.stringify(user));

                const redirection =  sessionStorage.getItem('redirectAfterLogin');
                sessionStorage.removeItem('redirectAfterLogin');
                // after the user successfully logs in the index should say hi <user's first name> 
                window.location.href = redirection || 'index.html';
            }
    }
})

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

