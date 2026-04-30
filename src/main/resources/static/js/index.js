
    import * as wishlistFunc from "./addToWishlist.js";
window.addEventListener('load', async function () {
    const productContainer = document.querySelector('.product-container');


    function updateResultsDisplay(count, searchTerm = '') {
        const oldResultsDisplay = document.querySelector('#numResultsDisplay');
        if(searchTerm===""){
            return;
        }
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
            wishlistFunc.add(product);
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





});


