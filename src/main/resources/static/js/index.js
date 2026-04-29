window.addEventListener('load', async function (e) {
    const btnCreateListing = document.querySelector('.create-listing-btn'),
        user = JSON.parse(sessionStorage.getItem('user')),
        productContainer = document.querySelector('.product-container'),
        inputSearchTerm = document.querySelector('#input-search-term'),
        hintSearchTerm = document.querySelector('#search-term-hint'),
        btnSearch = document.querySelector('.search-btn'),
        dropdown = document.querySelector("#category");

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

    function updateResultsDisplay(count, searchTerm = '') {
        const oldResultsDisplay = document.querySelector('#numResultsDisplay');
        if (oldResultsDisplay) {
            oldResultsDisplay.remove();
        }
        // Ensures proper grammar for result number message 
        const numResultsDisplay = document.createElement('h2');
        numResultsDisplay.id = 'numResultsDisplay';

        if (count === 0) {
            numResultsDisplay.textContent = `0 products found for ${searchTerm}. Enter another search term`;
        }
        else if (count === 1) {
            numResultsDisplay.textContent = `1 product found for ${searchTerm}`;
        }
        else {
            numResultsDisplay.textContent = `${count} products`;
        }

        const productsHeading = document.querySelector('h2');
        productsHeading.insertAdjacentElement('afterend', numResultsDisplay);
    }

    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = `/media/productImages/${product.imageLocation}/0.png`;
        productImage.addEventListener('error', () => {
            productImage.src = '/media/logo.png';
        });

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productPrice = document.createElement('h2');
        productPrice.textContent = ` £${product.price.toFixed(2)}`;

        const btnWishlistProduct = document.createElement('button');
        btnWishlistProduct.innerHTML = '<i class="fa-regular fa-heart"></i>';
        btnWishlistProduct.classList.add('wishlist-product-btn');
        btnWishlistProduct.addEventListener('click', (e) => {
            // Stops product page opening when user wishlists item
            e.stopPropagation();
            const icon = btnWishlistProduct.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        });

        productCard.appendChild(productImage);
        productCard.appendChild(btnWishlistProduct);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);

        productCard.addEventListener('click', () => {
            window.location.href = `product.html?id=${product.prodID}`;
        });

        return productCard;
    }

    //FETCHES PRODUCTS IN THROUGH API AND MAKES THEM CARDS 
    try {
        const response = await fetch('/api/product/findAll');
        const products = await response.json();

        // Creates the card with the item's image, name, heart button in the top right corner, price under card so title then price
        products.forEach(product => productContainer.appendChild(createProductCard(product)));
        updateResultsDisplay(products.length);
    } catch (err) {
        console.error(err);
    }

    // 2. IMPLEMENT SEARCH THROUGH PRODUCTS

    let isSearching = false;

    async function searchProducts() {
        document.querySelector('#category').value = 'chooseCategory';
        if (isSearching) {
            return;
        }
        isSearching = true;
        const searchTerm = inputSearchTerm.value.trim();
        if (!searchTerm) {
            // reloads all products
            location.reload();
            isSearching = false;
            return;
        }

        try {
            // URL can't have whitespaces so I used encodeURIComponent to remove them in the search input before it's used in the URL.
            const encodedSearchInput = encodeURIComponent(searchTerm);
            const url = '/api/product/fuzzySearch/' + encodedSearchInput;
            const searchResponse = await fetch(url);
            const products = await searchResponse.json();
            // Clear products
            productContainer.innerHTML = '';
            updateResultsDisplay(products.length, searchTerm);
            // Creates the card with the item's image, name, heart button in the top right corner, price under card so title then price
            products.forEach(product => productContainer.appendChild(createProductCard(product)));
        } catch (err) {
            console.error(err);
        }

        isSearching = false;
    }

    btnSearch.addEventListener('click', searchProducts);
    inputSearchTerm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchProducts();
        }
    });

    // Filtering products by category 

    dropdown.addEventListener('change', async function () {
        const subcatID = this.value;
        if (!subcatID || subcatID === 'chooseCategory') {
            return;
        }

        try {
            const catUrl = (`/api/product/findBySubcategory/${subcatID}`);
            const categoryResponse = await fetch(catUrl);
            const products = await categoryResponse.json();
            productContainer.innerHTML = '';
            const categoryName = this.options[this.selectedIndex].text;
            updateResultsDisplay(products.length, categoryName);
            products.forEach(product => productContainer.appendChild(createProductCard(product)))
        } catch(err) {
            console.error(err);
        }
    });

});


