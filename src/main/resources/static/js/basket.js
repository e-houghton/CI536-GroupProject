function getBasket() {
    return JSON.parse(sessionStorage.getItem('basket') || '[]');
}

function saveBasket(basket) {
    sessionStorage.setItem('basket', JSON.stringify(basket));
}

function updateBasketCount() {
    const basket = getBasket();
    const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

    const count = document.getElementById('basket-count');
    if (!count) { return };
    if (totalItems > 0) {
        count.textContent = totalItems > 99 ? '99+' : totalItems;
        count.style.display = 'inline-flex';
    } else {
        count.style.display = 'none';
    }
}

window.addEventListener('load', async function (e) {
    if (!window.location.pathname.includes('basket.html')) {
        return;
    }

    updateBasketCount()

    const basket = getBasket();
    const basketItems = document.querySelector('.basket-items');
    const basketSubtotal = document.getElementById('basket-subtotal');
    const basketTotal = document.getElementById('basket-total');
    const basketContainer = document.querySelector('.basket-container');
    const btnCheckout = document.querySelector('.checkout-btn');
    const user = JSON.parse(sessionStorage.getItem('user'));

    btnCheckout.addEventListener('click', checkout);
  
    if (basket.length === 0) {
        basketContainer.textContent = 'Your basket is empty.'
        return;
    }

    loadBasket();

    function loadBasket() {
        basketItems.innerHTML = '';
        basket.forEach(item => basketItems.appendChild(createBasketProduct(item)));
        updateOrderSummary();
    }

    function createBasketProduct(item) {
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

        const productDescription = document.createElement('p');
        productDescription.textContent = item.description;

        const productCategory = document.createElement('span');
        productCategory.textContent = item.category;

        productDetails.appendChild(productName);
        productDetails.appendChild(productDescription);
        productDetails.appendChild(productCategory);

        // price 
        const productPrice = document.createElement('div');
        productPrice.classList.add('basket-price');
        productPrice.textContent = ` £${item.price.toFixed(2)}`;

        // quantity spinner 
        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-container');

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 0;
        quantityInput.max = item.stock;
        quantityInput.value = item.quantity;

        quantityInput.addEventListener('change', () => {
            let newQuantity = parseInt(quantityInput.value);

            if (newQuantity === 0) {
                basket.splice(basket.indexOf(item), 1);
                row.remove();
            }
            if (newQuantity > item.stock) {
                newQuantity = item.stock
            }
            if (newQuantity < 1) {
                newQuantity = 1;
            }
            quantityInput.value = newQuantity;
            item.quantity = newQuantity;

            saveBasket(basket);
            updateOrderSummary();
        });

        quantityContainer.appendChild(quantityInput);

        row.appendChild(productImage);
        row.appendChild(productDetails);
        row.appendChild(productPrice);
        row.appendChild(quantityContainer);
        return row;
    }

    function updateOrderSummary() {
          let subtotal = 0;

        for (const item of basket) {
            subtotal += item.price * item.quantity;
        }

        basketSubtotal.textContent = `£${subtotal.toFixed(2)}`;
        basketTotal.textContent = `£${subtotal.toFixed(2)}`;
    }

    function checkout() {
        // if nothing in basket don't let them go to checkout and show a hint
        // Pass products to checkout and show products in the checkout 
        // if not logged in
          if (user) {
            window.location.href = 'checkout.html';
        }
        else {
            window.location.href = 'guest-or-login.html';
        }
    }
});


