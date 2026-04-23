window.addEventListener('load', function (e) {

    const divSignup = document.querySelector('.signup-page'),
        divLoading = document.querySelector('#divLoading'),
        divSuccess = document.querySelector('#divSuccess'),
        divError = document.querySelector('#divError'),

        btnSignup = document.querySelector('.signup-btn'),
        btnSignup2 = document.querySelector('.signup-btn-2'),
        btnBack = document.querySelector('.back-btn'),
        btnCancel = document.querySelector('.cancel-btn'),

        form = document.querySelector('form'),

        firstInputArea = document.querySelector('#first-input-area'),
        secondInputArea = document.querySelector('#second-input-area'),


        inputFirstName = document.querySelector('#first-name'),
        inputSurname = document.querySelector('#surname'),
        inputEmail = document.querySelector('#email'),
        inputUsername = document.querySelector('#username'),
        inputPassword = document.querySelector('#password'),
        inputRepeatPassword = document.querySelector('#repeat-password'),

        hintFirstName = document.querySelector('#first-name-hint'),
        hintSurname = document.querySelector('#surname-hint'),
        hintEmail = document.querySelector('#email-hint'),
        hintUsername = document.querySelector('#username-hint'),
        hintPassword = document.querySelector('#password-hint'),
        hintRepeatPassword = document.querySelector('#repeat-password-hint'),

        inputPhoneNumber = document.querySelector('#phone-number'),
        inputAddrLine1 = document.querySelector('#addr-line-1'),
        inputAddrLine2 = document.querySelector('#addr-line-2'),
        inputCity = document.querySelector('#city'),
        inputCounty = document.querySelector('#county'),
        inputPostcode = document.querySelector('#postcode'),
        inputCountry = document.querySelector('#country-dropdown'),

        hintPhoneNumber = document.querySelector('#phone-number-hint'),
        hintAddrLine1 = document.querySelector('#addr-line-1-hint'),
        hintAddrLine2 = document.querySelector('#addr-line-2-hint'),
        hintCity = document.querySelector('#city-hint'),
        hintCounty = document.querySelector('#county-hint'),
        hintPostcode = document.querySelector('#postcode-hint'),
        hintCountry = document.querySelector('#country-hint');

    const iti = window.intlTelInput(inputPhoneNumber, {
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "gb",
        separateDialCode: true
    });

    // api used to avoid entering countries into the select manually
    fetch('https://restcountries.com/v3.1/all?fields=name')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById('country-dropdown');
            data.sort((a, b) => a.name.common.localeCompare(b.name.common))
            data.forEach(country => {
                const countryOption = document.createElement('option');
                countryOption.value = country.name.common;
                countryOption.textContent = country.name.common;
                dropdown.appendChild(countryOption);
            });
        });

    // Leads user to the login page 
    btnCancel.addEventListener('click', function () {
        window.location.href = 'login.html';
    });

    btnSignup.addEventListener('click', async function (e) {
        e.preventDefault();
        if (await validateFirstInputs()) {
            firstInputArea.style.display = 'none';
            secondInputArea.style.display = 'block';
        }
    });

    btnSignup2.addEventListener('click', createAccount);



    // Removing hints when the user types into the input field again 
    document.querySelectorAll('.input-field input, .input-field select').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('invalid');
            const field = this.closest('.input-field');
            const hint = field.querySelector('.hint');
            // finds input field's hint
            if (hint) {
                hint.style.display = 'none';
            }
        });
    });

    //Removing hint when user types into phone number

    inputPhoneNumber.addEventListener('input', function () {
        inputPhoneNumber.classList.remove('invalid');
        hintPhoneNumber.style.display = 'none';
    });

    // Password strength feedback 
    inputPassword.addEventListener('input', () => {
        hintPassword.classList.remove('no-icon');
        const password = inputPassword.value;
        const length = password.length >= 8;
        const upper = /[A-Z]/.test(password);
        const lower = /[a-z]/.test(password);
        const number = /[0-9]/.test(password);
        const special = /[£¬`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        const passed = [length, upper, lower, number, special].filter(Boolean).length;
        let strength = '';
        if (passed === 5) {
            strength = 'Strong';
            hintPassword.style.color = 'green';
        } else if (passed >= 3) {
            strength = 'Moderate';
            hintPassword.style.color = 'orange';
        } else {
            strength = 'Weak';
            hintPassword.style.color = 'red';
        }
        hintPassword.textContent = `Strength: ${strength}`;
        hintPassword.style.display = 'inline';

        document.getElementById("len").textContent = `${length ? '\u2705' : '\u274C'} 8 characters minimum`;
        document.getElementById("up").textContent = `${upper ? '\u2705' : '\u274C'} At least one upper case letter`;
        document.getElementById("low").textContent = `${lower ? '\u2705' : '\u274C'} At least one lower case letter`;
        document.getElementById("num").textContent = `${number ? '\u2705' : '\u274C'} At least one number`;
        document.getElementById("sym").textContent = `${special ? '\u2705' : '\u274C'} At least one special character`;
        hintPassword.classList.add('no-icon');

        if (!password) {
            fieldsOk = false;
            inputPassword.classList.add('invalid');
            hintPassword.classList.remove('visible');
            hintPassword.textContent = 'Please enter a password';
            hintPassword.style.display = 'inline';
            return;
        }

    });

    // Shows the first input area, from the second input area where user enters phonenum and address details
    btnBack.addEventListener('click', function () {
        secondInputArea.style.display = 'none';
        firstInputArea.style.display = 'block';
    });

    async function validateFirstInputs() {
        const regexFirstName = /^[a-zA-Z\s\-]+$/,
            regexSurname = /^[a-zA-Z\s\-']+$/,
            regexUsername = /^[a-zA-Z0-9\-]+$/,
            regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

            firstName = inputFirstName.value.trim(),
            surname = inputSurname.value.trim(),
            username = inputUsername.value.trim(),
            email = inputEmail.value.trim(),
            password = inputPassword.value.trim(),
            repeatPassword = inputRepeatPassword.value.trim();

        let fieldsOk = true;

        // FIRST NAME VALIDATION
        if (!firstName) {
            fieldsOk = false;
            inputFirstName.classList.add('invalid');
            hintFirstName.classList.remove('visible');
            hintFirstName.style.display = 'inline';
        } else if (!regexFirstName.test(firstName)) {
            fieldsOk = false;
            inputFirstName.classList.add('invalid');
            hintFirstName.classList.remove('visible');
            hintFirstName.textContent = 'Name cannot contain special characters!'
            hintFirstName.style.display = 'inline';
        } else {
            hintFirstName.style.display = '';
        }

        //SURNAME VALIDATION
        if (!surname) {
            fieldsOk = false;
            inputSurname.classList.add('invalid');
            hintSurname.classList.remove('visible');
            hintSurname.style.display = 'inline';
        } else if (!regexSurname.test(surname)) {
            fieldsOk = false;
            inputSurname.classList.add('invalid');
            hintSurname.classList.remove('visible');
            hintSurname.textContent = 'Surname cannot contain special characters!';
            hintSurname.style.display = 'inline';
        } else {
            hintSurname.style.display = ''
        }

        // EMAIL VALIDATION
        if (!email) {
            fieldsOk = false;
            inputEmail.classList.add('invalid');
            hintEmail.classList.remove('visible');
            hintEmail.textContent = 'Please enter a valid email';
            hintEmail.style.display = 'inline';
        } else if (!regexEmail.test(email)) {
            fieldsOk = false;
            inputEmail.classList.add('invalid');
            hintEmail.classList.remove('visible');
            hintEmail.textContent = 'Please enter a valid email.';
            hintEmail.style.display = 'inline';
        } else {
            try {
                // EMAIL BACKEND VALIDATION TO CHECK EMAIL HASN'T BEEN TAKEN
                const emailResponse = await fetch(`http://localhost:8080/api/customer/existsByEmail/${email}`);
                if (!emailResponse.ok) throw new Error(`Failed to validate the email: ${emailResponse.status} `)
                const emailTaken = await emailResponse.json();
                if (emailTaken) {
                    fieldsOk = false;
                    inputEmail.classList.add('invalid');
                    hintEmail.classList.remove('visible');
                    hintEmail.textContent = 'An account with this email already exists!';
                    hintEmail.style.display = 'inline';
                } else {
                    hintEmail.style.display = '';
                }
            } catch (err) {
                console.error('Email validation error:', err);
            }
        }

        // USERNAME VALIDATION  
        if (!username) {
            fieldsOk = false;
            inputUsername.classList.add('invalid');
            hintUsername.classList.remove('visible');
            hintUsername.textContent = 'Please enter your username';
            hintUsername.style.display = 'inline';
        } else if (!regexUsername.test(username)) {
            fieldsOk = false;
            hintUsername.textContent = 'Username cannot contain special characters!';
            hintUsername.style.display = 'inline';
        } else {
            try {
                // USERNAME BACKEND VALIDATION TO CHECK USERNAME HASN'T BEEN TAKEN
                const usernameResponse = await fetch(`http://localhost:8080/api/user/existsByUsername/${username}`);
                if (!usernameResponse.ok) throw new Error(`Failed to validate the username: ${usernameResponse.status} `)
                const usernameTaken = await usernameResponse.json();
                if (usernameTaken) {
                    fieldsOk = false;
                    inputUsername.classList.add('invalid');
                    hintUsername.classList.remove('visible');
                    hintUsername.textContent = 'This username has already been taken by another user. Try another?';
                    hintUsername.style.display = 'inline';
                } else {
                    hintUsername.style.display = ''
                }
            } catch (err) {
                console.error('Username validation error:', err);
            }
        }

        // PASSWORD VALIDATION
        if (!password) {
            fieldsOk = false;
            inputPassword.classList.add('invalid');
            hintPassword.classList.remove('visible');
            hintPassword.style.display = 'inline';
        } else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/.test(password))) {
            fieldsOk = false;
            inputPassword.classList.add('invalid');
            hintPassword.classList.remove('visible');
            hintPassword.textContent = 'Must have 8+ characters, uppercase & lowercase letters, a number and a special character'
        }

        // REPEAT PASSWORD VALIDATION
        if (!repeatPassword) {
            fieldsOk = false;
            inputRepeatPassword.classList.add('invalid');
            hintRepeatPassword.classList.remove('visible');
            hintRepeatPassword.style.display = 'inline';
        } else if (repeatPassword !== password) {
            fieldsOk = false;
            inputRepeatPassword.classList.add('invalid');
            hintRepeatPassword.classList.remove('visible');
            hintRepeatPassword.textContent = 'Passwords do not match!'
            hintRepeatPassword.style.display = 'inline';
        } else {
            hintRepeatPassword.style.display = '';
        }

        if (fieldsOk) {
            return true;
        }
    }

    async function validateSecondInputs() {
        const regexAddrLine1 = /^[a-zA-Z0-9\s.,'#-]{5,100}$/,
            regexAddrLine2 = /^[a-zA-Z0-9\s.,'#-]{0,100}$/,
            regexCitynCounty = /^[a-zA-Z\s-]{2,50}$/,
            regexPostcode = /^[a-zA-Z0-9\s-]{3,10}$/,
            phoneNumber = inputPhoneNumber.value.trim(),
            addrLine1 = inputAddrLine1.value.trim(),
            addrLine2 = inputAddrLine2.value.trim(),
            city = inputCity.value.trim(),
            county = inputCounty.value.trim(),
            postcode = inputPostcode.value.trim(),
            country = inputCountry.value.trim();

        let fieldsOk = true;

        // PHONE NUMBER VALIDATION
        if (!phoneNumber) {
            fieldsOk = false;
            inputPhoneNumber.classList.add('invalid');
            hintPhoneNumber.classList.remove('visible');
            hintPhoneNumber.textContent = 'Please enter your phone number';
            hintPhoneNumber.style.display = 'inline';
        } else if (!iti.isValidNumber()) {
            fieldsOk = false;
            inputPhoneNumber.classList.add('invalid');
            hintPhoneNumber.classList.remove('visible');
            hintPhoneNumber.textContent = 'Please enter a valid phone number';
            hintPhoneNumber.style.display = 'inline';
        } else {
            try {
                // PHONE NUMBER BACKEND VALIDATION TO CHECK PHONE NUMBER HASN'T BEEN TAKEN
                const phoneNumberResponse = await fetch(`http://localhost:8080/api/customer/existsByPhone/${encodeURIComponent(iti.getNumber())}`);
                if (!phoneNumberResponse.ok) throw new Error(`Failed to validate the phone number: ${phoneNumberResponse.status} `)
                const phoneNumberTaken = await phoneNumberResponse.json();
                if (phoneNumberTaken) {
                    fieldsOk = false;
                    inputPhoneNumber.classList.add('invalid');
                    hintPhoneNumber.classList.remove('visible');
                    hintPhoneNumber.textContent = 'An account with this phone number already exists!';
                    hintPhoneNumber.style.display = 'inline';
                } else {
                    hintPhoneNumber.style.display = '';
                }
            } catch (err) {
                console.error('Phone number validation error:', err);
            }
        }


        // ADDRESS LINE 1 VALIDATION
        if (!addrLine1) {
            fieldsOk = false;
            inputAddrLine1.classList.add('invalid');
            hintAddrLine1.classList.remove('visible');
            hintAddrLine1.style.display = 'inline';
        } else if (!regexAddrLine1.test(addrLine1)) {
            fieldsOk = false;
            inputAddrLine1.classList.add('invalid');
            hintAddrLine1.textContent = 'Please enter a valid address';
            hintAddrLine1.style.display = 'inline';
        } else {
            hintAddrLine1.style.display = ''
        }

        // ADDRESS LINE 2 VALIDATION 
        if (addrLine2 && !regexAddrLine2.test(addrLine2)) {
            fieldsOk = false;
            inputAddrLine2.classList.add('invalid');
            hintAddrLine2.classList.remove('visible');
            hintAddrLine2.style.display = 'inline';
        } else {
            hintAddrLine2.style.display = '';
        }

        // CITY VALIDATION
        if (!city) {
            fieldsOk = false;
            inputCity.classList.add('invalid');
            hintCity.classList.remove('visible');
            hintCity.style.display = 'inline';
        } else if (!regexCitynCounty.test(city)) {
            fieldsOk = false;
            inputCity.classList.add('invalid');
            hintCity.textContent = 'Please enter a valid city';
            hintCity.style.display = 'inline';
        } else {
            hintCity.style.display = '';
        }

        // COUNTY VALIDATION
        if (!county) {
            fieldsOk = false;
            inputCounty.classList.add('invalid');
            hintCounty.classList.remove('visible');
            hintCounty.style.display = 'inline';
        } else if (!regexCitynCounty.test(county)) {
            fieldsOk = false;
            inputCounty.classList.add('invalid');
            hintCounty.textContent = 'Please enter a valid county';
            hintCounty.style.display = 'inline';
        } else {
            hintCounty.style.display = '';
        }

        // POSTCODE VALIDATION

        if (!postcode) {
            fieldsOk = false;
            inputPostcode.classList.add('invalid');
            hintPostcode.classList.remove('visible');
            hintPostcode.style.display = 'inline';
        } else if (!regexPostcode.test(postcode)) {
            fieldsOk = false;
            inputPostcode.classList.add('invalid');
            hintPostcode.textContent = 'Please enter a valid postcode';
            hintPostcode.style.display = 'inline';
        } else {
            hintPostcode.style.display = '';
        }

        // COUNTRY VALIDATION
        if (!country) {
            fieldsOk = false;
            inputCountry.classList.add('invalid');
            hintCountry.classList.remove('visible');
            hintCountry.style.display = 'inline';
        } else {
            hintCountry.style.display = '';
        }

        if (fieldsOk) {
            return true;
        }
    }

    async function createAccount(e) {
        e.preventDefault();

        if (await validateSecondInputs()) {
            divSignup.style.display = 'none';
            divLoading.style.display = 'block';

            //this is where I connect to the api controllers and add account to db
            try {
                // Creating a customer
                const customerResponse = await fetch('http://localhost:8080/api/customer/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fname: inputFirstName.value.trim(),
                        lname: inputSurname.value.trim(),
                        email: inputEmail.value.trim(),
                        phone: iti.getNumber(),
                        addrLine1: inputAddrLine1.value.trim(),
                        addrLine2: inputAddrLine2.value.trim(),
                        addrCity: inputCity.value.trim(),
                        addrCounty: inputCounty.value.trim(),
                        addrPostCode: inputPostcode.value.trim(),
                        addrCountry: inputCountry.value.trim(),
                        guest: false
                    })
                });

                if (!customerResponse.ok) throw new Error('Failed to create a new customer');

                const savedCustomer = await customerResponse.json();

                if (!savedCustomer) throw new Error('couldnt find saved customer');

                // Create the user tied to the customer 
                const userResponse = await fetch('http://localhost:8080/api/user/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: inputUsername.value.trim(),
                        password: inputPassword.value.trim(),
                        customer: savedCustomer
                    })
                });
                if (!userResponse.ok) throw new Error('Failed to create user');

                const savedUser = await userResponse.json();

                // allows the user object to be stored and accessed during the browser session
                sessionStorage.setItem('user', JSON.stringify(savedUser));

                // after the user successfully logs in the index should say hi <user's first name> 
                window.location.href = 'index.html';
                
            } catch (err) {
                console.error(err);
                divLoading.style.display = 'none';
                divError.style.display = 'block';
            }
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
