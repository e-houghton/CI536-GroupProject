window.addEventListener('load', function (e) {

    const divCheckout = document.querySelector('.checkout-page'),
        divLoading = document.querySelector('#divLoading'),
        divSuccess = document.querySelector('#divSuccess'),
        divError = document.querySelector('#divError'),

        btnBuy = document.querySelector('.buy-btn'),
        btnApply = document.querySelector('.apply-discount-btn'),

        form = document.querySelector('form'),

        firstInputArea = document.querySelector('#first-input-area'),
        secondInputArea = document.querySelector('#second-input-area'),

        inputFirstName = document.querySelector('#first-name'),
        inputSurname = document.querySelector('#surname'),
        inputEmail = document.querySelector('#email'),
        inputPhoneNumber = document.querySelector('#phone-number'),

        hintFirstName = document.querySelector('#first-name-hint'),
        hintSurname = document.querySelector('#surname-hint'),
        hintEmail = document.querySelector('#email-hint'),
        hintPhoneNumber = document.querySelector('#phone-number-hint'),

        inputAddrLine1 = document.querySelector('#addr-line-1'),
        inputAddrLine2 = document.querySelector('#addr-line-2'),
        inputCity = document.querySelector('#city'),
        inputCounty = document.querySelector('#county'),
        inputPostcode = document.querySelector('#postcode'),
        inputCountry = document.querySelector('#country-dropdown'),

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
            // Calls autofill details method if a user's logged in 
            // Doing this in the restcountries fetch ensures country field is autofilled
            const user = JSON.parse(sessionStorage.getItem('user'));

            if (user) {
                autofillDetails(user);
            }

        });

    btnBuy.addEventListener('click', buyBasket);

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

    // loading basket 
    const basket = getBasket();
    const basketItems = document.querySelector('.basket-items');
    const basketSubtotal = document.getElementById('basket-subtotal');
    const basketTotal = document.getElementById('basket-total');
    const basketContainer = document.querySelector('.basket-container');
    const btnCheckout = document.querySelector('.checkout-btn');

    loadBasket();

    async function validateFirstInputs() {
        const regexFirstName = /^[a-zA-Z\s\-]+$/,
            regexSurname = /^[a-zA-Z\s\-']+$/,
            regexUsername = /^[a-zA-Z0-9\-]+$/,
            regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            firstName = inputFirstName.value.trim(),
            surname = inputSurname.value.trim(),
            email = inputEmail.value.trim(),
            phoneNumber = inputPhoneNumber.value.trim();

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
            hintEmail.style.display = '';
        }



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
            hintPhoneNumber.style.display = '';
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
            addrLine1 = inputAddrLine1.value.trim(),
            addrLine2 = inputAddrLine2.value.trim(),
            city = inputCity.value.trim(),
            county = inputCounty.value.trim(),
            postcode = inputPostcode.value.trim(),
            country = inputCountry.value.trim();

        let fieldsOk = true;

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

    function autofillDetails(user) {
        if (!user || !user.customer) {
            return;
        }

        const customer = user.customer;
        inputFirstName.value = customer.fname || '';
        inputSurname.value = customer.lname || '';
        inputEmail.value = customer.email || '';

        iti.setNumber(customer.phone);

        inputAddrLine1.value = customer.addrLine1 || '';
        inputAddrLine2.value = customer.addrLine2 || '';
        inputCity.value = customer.addrCity || '';
        inputCounty.value = customer.addrCounty || '';
        inputPostcode.value = customer.addrPostCode || '';
        inputCountry.value = customer.addrCountry || '';

    }

    function loadBasket() {
        basketItems.innerHTML = '';

        if (basket.length === 0) {
            basketContainer.textContent = 'Your basket is empty.'
            return;
        }

        basket.forEach(item => basketItems.appendChild(createCheckoutItem(item)));


        updateCheckoutSummary();
    }

    function createCheckoutItem(item) {
        const row = document.createElement('div');
        row.classList.add('basket-row');

        // product image
        const productImage = document.createElement('img');
        productImage.src = item.image || '/media/logo.png';
        productImage.classList.add('basket-item-image');

        // product details
        const productDetails = document.createElement('div');
        productDetails.classList.add('basket-item-details')

        const productName = document.createElement('h3');
        productName.textContent = item.name;

        productDetails.appendChild(productName);

        // price 
        const productPrice = document.createElement('div');
        productPrice.classList.add('basket-price');
        productPrice.textContent = ` £${item.price.toFixed(2)}`;

        const quantity = document.createElement('span');
        quantity.textContent = `x${item.quantity}`;

        row.appendChild(productImage);
        row.appendChild(productDetails);
        row.appendChild(productPrice);
        row.appendChild(quantity);
        return row;
    }

    function updateCheckoutSummary() {
        let subtotal = 0;

        for (const item of basket) {
            subtotal += item.price * item.quantity;
        }

        basketSubtotal.textContent = `£${subtotal.toFixed(2)}`;
        basketTotal.textContent = `£${subtotal.toFixed(2)}`;
    }

    async function buyBasket(e) {
        e.preventDefault();

        firstOk = await validateFirstInputs();
        secondOk = await validateSecondInputs();
        if (!firstOk || !secondOk) {
            return;
        }
        divCheckout.style.display = 'none';
        divLoading.style.display = 'block';

        //this is where I connect to the api controllers and add the order to the db
        try {
            const user = JSON.parse(sessionStorage.getItem('user'));
            let customer;

            if (user) {
                customer = user.customer;
            } else {
                // Creating a customer with guest flagged for guest checkout 
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
                        guest: true
                    })
                });
                if (!customerResponse.ok) {
                    throw new Error('Failed to create a new customer');
                }
                const savedCustomer = await customerResponse.json();
                if (!savedCustomer) {
                    throw new Error('couldnt find saved customer');
                }
            }

            // creating the order
            const orderResponse = await fetch('http://localhost:8080/api/order/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    buyer: customer,
                    purchaseDate: new Date().toISOString().split('T')[0]
                })
            });
            if (!orderResponse.ok) {
                throw new Error('Failed to create an order!');
            }
            const savedOrder = await orderResponse.json();

            // creating the order lines and updating the stock

            for (const item of basket) {
                const orderLineResponse = await fetch(
                    `http://localhost:8080/api/orderline/addByIds/${savedOrder.orderID}/${item.prodID}`,
                    { method: 'POST' }
                );
                if (!orderLineResponse.ok) {
                    throw new Error(`Failed to create an orderline for ${item.name}`);
                }

                const newQuantity = item.stock - item.quantity;
                const updateStockResponse = await fetch(`http://localhost:8080/api/product/updateStock/${item.prodID}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        quant: newQuantity,
                        sold: newQuantity <= 0
                    })
                });
                if (!updateStockResponse.ok) {
                    throw new Error(`Failed to update stock for ${item.name}`);
                }
            }
            sessionStorage.removeItem('basket');
            divLoading.style.display = 'none';
            divSuccess.querySelector('h2').textContent = `Thank you for your order! Your order number is #${savedOrder.orderID}`;
            divSuccess.style.display = 'block';

            // redirects the user back to the index page after some time
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (err) {
            divLoading.style.display = 'none';
            divError.style.display = 'block';
        }
    }
});



