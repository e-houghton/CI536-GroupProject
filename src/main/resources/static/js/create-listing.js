window.addEventListener('load', function (e) {

    const divSignup = document.querySelector('.signup-page'),
        divLoading = document.querySelector('#divLoading'),
        divSuccess = document.querySelector('#divSuccess'),
        divError = document.querySelector('#divError'),
        divImagePreview = document.getElementById('image-preview'),

        btnImageUpload = document.querySelector('.image-upload-btn'),
        btnItemUpload = document.querySelector('.upload-btn'),
        btnBack = document.querySelector('.back-btn'),
        btnCancel = document.querySelector('.cancel-btn'),

        form = document.querySelector('form'),

        firstInputArea = document.querySelector('#first-input-area'),
        secondInputArea = document.querySelector('#second-input-area'),

        // Item property inputs 
        // INPUT IMAGES??

        inputItemName = document.querySelector('#item-name'),
        inputItemDescription = document.querySelector('#item-description'),
        inputItemCategory = document.querySelector('#category-dropdown'),
        inputItemPrice = document.querySelector('#item-price'),
        inputItemQuantity = document.querySelector('#item-quantity'),

        // Hints
        hintItemImage = document.querySelector('#item-image-hint'),
        hintItemName = document.querySelector('#item-name-hint'),
        hintItemDescription = document.querySelector('#item-description-hint'),
        hintItemCategory = document.querySelector('#item-category-hint'),
        hintItemPrice = document.querySelector('#item-price-hint'),
        hintItemQuantity = document.querySelector('#item-quantity-hint');

    // Leads user to the login page 
    btnImageUpload.addEventListener('click', openImageFiles);
    btnItemUpload.addEventListener('click', createItem);

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        const signInBtn = document.getElementById('sign-in-btn');
        signInBtn.textContent = `Hi ${user.customer.fname}`;
        signInBtn.href = '#';
    }

    function openImageFiles() {
        document.getElementById('image-upload-input').click();
    }

    document.getElementById('image-upload-input').addEventListener('change', openFiles);

    function openFiles(e) {
        const files = Array.from(e.target.files);
        const maxImages = 20;

        files.forEach(file => {
            // checks image total 
            const imgTotal = divImagePreview.querySelectorAll('img').length;
            if (imgTotal >= maxImages) { return; }

            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');


            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.classList.add('image-preview');

            const btnRemoveImage = document.createElement('button');
            btnRemoveImage.textContent = 'x';
            btnRemoveImage.classList.add('remove-image-btn')

            btnRemoveImage.addEventListener('click', () => {
                imageWrapper.remove();
                const newTotal = divImagePreview.querySelectorAll('img').length;
                if (newTotal < maxImages) {
                    btnImageUpload.style.display = 'flex';
                    hintItemImage.style.display = '';
                }
                if (newTotal === 0) {
                    hintItemImage.textContent = 'Please upload an image of your item';
                }
            });
            imageWrapper.appendChild(img)
            imageWrapper.appendChild(btnRemoveImage);
            divImagePreview.appendChild(imageWrapper);
        });
        divImagePreview.appendChild(btnImageUpload);
        btnImageUpload.classList.add('compact');

        // Checks if  the new total of images exceeds or reaches the limit
        const newTotal = divImagePreview.querySelectorAll('img').length;
        if (newTotal >= maxImages) {
            btnImageUpload.style.display = 'none';
            //hintItemImage.classList.remove('visible');
            hintItemImage.textContent = 'You have reached the 20 image limit'
            hintItemImage.style.display = 'inline';
            return;
        } else {
            btnImageUpload.style.display = 'flex';
            hintItemImage.style.display = '';
        }

        e.target.value = '';
    }

    // keeps price to 2dp 
    inputItemPrice.addEventListener('input', () => {
        const value = inputItemPrice.value;
        if (value.includes('.') && value.split('.')[1].length > 2) {
            inputItemPrice.value = parseFloat(value).toFixed(2)
        }
    });

    //Keeps quantity to one whole number
    inputItemQuantity.addEventListener('keydown', (e) => {
        if (e.key === '.' || e.key === ',') e.preventDefault();
    });

    // Removing hints when the user types into the input field again 
    document.querySelectorAll('.listing-row input, .listing-row select, .listing-row textarea').forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('invalid');
            const row = this.closest('.listing-row');
            const hint = row.querySelector('.hint');
            // finds input field's hint
            if (hint) {
                hint.style.display = 'none';
            }
        });
    });

    async function createItem(e) {
        e.preventDefault();
        const regexPrice = /^\d+(\.\d{1,2})?$/,
            imgTotal = divImagePreview.querySelectorAll('img').length,
            itemName = inputItemName.value.trim(),
            itemDescription = inputItemDescription.value.trim(),
            itemCategory = inputItemCategory.value.trim(),
            itemPrice = inputItemPrice.value.trim(),
            itemQuantity = inputItemQuantity.value.trim();

        let fieldsOk = true;

        // ITEM IMAGE VALIDATION 
        if (imgTotal === 0) {
            fieldsOk = false;
            //inputItemImage.classList.add('invalid');
            hintItemImage.classList.remove('visible');
            hintItemImage.style.display = 'inline';
        } else {
            hintItemImage.style.display = '';
        }

        // ITEM NAME VALIDATION
        if (!itemName) {
            fieldsOk = false;
            inputItemName.classList.add('invalid');
            hintItemName.classList.remove('visible');
            hintItemName.style.display = 'inline';
        } else if (itemName.length < 3) {
            fieldsOk = false;
            inputItemName.classList.add('invalid');
            hintItemName.classList.remove('visible');
            hintItemName.textContent = 'Name must be 3 characters minimum!';
            hintItemName.style.display = 'inline';
        } else if (itemName.length > 100) {
            fieldsOk = false;
            inputItemName.classList.add('invalid');
            hintItemName.classList.remove('visible');
            hintItemName.textContent = 'Name cannot be more than 100 characters!';
            hintItemName.style.display = 'inline';
        } else {
            hintItemName.style.display = '';
        }


        // ITEM DESCRIPTION VALIDATION

        if (!itemDescription) {
            fieldsOk = false;
            inputItemDescription.classList.add('invalid');
            hintItemDescription.classList.remove('visible');
            hintItemDescription.style.display = 'inline';
        } else if (itemDescription.length < 5) {
            fieldsOk = false;
            inputItemDescription.classList.add('invalid');
            hintItemDescription.classList.remove('visible');
            hintItemDescription.textContent = 'Description must be 5 characters minimum!';
            hintItemDescription.style.display = 'inline';
        } else if (itemDescription.length > 2000) {
            fieldsOk = false;
            inputItemDescription.classList.add('invalid');
            hintItemDescription.classList.remove('visible');
            hintItemDescription.textContent = 'Description cannot be more than 2000 characters!';
            hintItemDescription.style.display = 'inline';
        } else {
            hintItemDescription.style.display = '';
        }

        // CATEGORY VALIDATION
        if (!itemCategory) {
            fieldsOk = false;
            inputItemCategory.classList.add('invalid');
            hintItemCategory.classList.remove('visible');
            hintItemCategory.style.display = 'inline';
        } else {
            hintItemCategory.style.display = '';
        }

        // SUBCATEGORY VALIDATION?
        // PRICE VALIDATION
        if (!itemPrice) {
            fieldsOk = false;
            inputItemPrice.classList.add('invalid');
            hintItemPrice.classList.remove('visible');
            hintItemPrice.style.display = 'inline';
        } else if (itemPrice < 0) {
            inputItemPrice.classList.add('invalid');
            hintItemPrice.classList.remove('visible');
            hintItemPrice.textContent = 'Price cannot be negative!';
            hintItemPrice.style.display = 'inline';
        } else if (itemPrice > 999999.99) {
            inputItemPrice.classList.add('invalid');
            hintItemPrice.classList.remove('visible');
            hintItemPrice.textContent = 'Price cannot be more than £999999.99';
            hintItemPrice.style.display = 'inline';

        } else {
            hintItemPrice.style.display = '';
        }

        // QUANTITY VALIDATION
        if (!itemQuantity || itemQuantity < 1) {
            fieldsOk = false;
            inputItemQuantity.classList.add('invalid');
            hintItemQuantity.classList.remove('visible');
            hintItemQuantity.style.display = 'inline';
        } else if (itemQuantity > 100) {
            fieldsOk = false;
            inputItemQuantity.classList.add('invalid');
            hintItemQuantity.classList.remove('visible');
            hintItemQuantity.textContent = 'Quantity cannot be over 100!';
            hintItemQuantity.style.display = 'inline';

        } else {
            hintItemQuantity.style.display = '';
        }

        if (fieldsOk) {
            const user = JSON.parse(sessionStorage.getItem('user'));
            const subcategoryResponse = await fetch(`http://localhost:8080/api/subcat/find/${inputItemCategory.value}`);
            const subcategory = await subcategoryResponse.json();
            //this is where I connect to the api controllers and add the product to the db
            try {
                // Creating a product
                const productResponse = await fetch('http://localhost:8080/api/product/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        //prodID
                        name: inputItemName.value.trim(),
                        description: inputItemDescription.value.trim(),
                        uploadDate: new Date(),
                        seller: user,
                        imageLocation: '/media/logo.png', // placeholder image before real input
                        price: parseFloat(inputItemPrice.value.trim()),
                        quant: parseInt(inputItemQuantity.value.trim()),
                        category: inputItemCategory.value.trim(),
                        subcategory: subcategory,
                        sold: false
                    })
                });

                if (!productResponse.ok) throw new Error('Failed to create a new product');

                window.location.href = 'index.html';

            } catch (err) {
                console.error(err);
                divError.style.display = 'block';
            }
        }
    }
});
