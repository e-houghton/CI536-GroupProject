import * as wishlistFunc from "./addToWishlist.js";
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

async function searchProducts(searchTerm) {

    const productContainer = document.querySelector('.product-container');
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

}
async function searchCategories(subcatID) {
    const productContainer = document.querySelector('.product-container');
    try {
        const catUrl = (`/api/product/findBySubcategory/${subcatID}`);
        const categoryResponse = await fetch(catUrl);
        const products = await categoryResponse.json();
        const cat = await fetch(`/api/subcat/find/${subcatID}`);
        const catJson = await cat.json();
        console.log(products);
        productContainer.innerHTML = '';
        const categoryName = catJson.name;
        console.log(categoryName);
        updateResultsDisplay(products.length, categoryName);
        products.forEach(product => productContainer.appendChild(createProductCard(product)))
    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("load", e => {
    const parameters = new URLSearchParams(window.location.search);
    const searchTerm = parameters.get('query');
    const subCat = parameters.get("subcat");
    if(searchTerm && !searchTerm.length==0){
        searchProducts(searchTerm);

    }
    else if (subCat && !subCat.length==0){
        searchCategories(subCat);
    }
    else{
        window.location="index.html";
    }

    
});

// Filtering products by category 

