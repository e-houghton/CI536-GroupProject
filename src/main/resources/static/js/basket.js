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
        count.style.display = 'inline-block';
    } else {
        count.style.display = 'none';
    }
}

window.addEventListener('load', async function (e) {
    if (!window.location.pathname.includes('basket.html')) {
        return;
    }
    const basketContainer = document.querySelector('.basket-container');
    const basket = getBasket();

    if (basket.length === 0) {
        basketContainer.textContent = 'Your basket is empty.'
        return;
    }

    const basketLayout = document.createElement('div');
    basketLayout.classList.add('basket-layout');

    const basketItems = this.document.createElement('div');
    basketItems.classList.add('basket-items');
    basketItems.appendChild(createColumnHeaders());
    basket.forEach(item => basketItems.appendChild(createBasketProduct(item)));

    basketLayout.appendChild(basketItems);
    basketLayout.appendChild(createOrderSummary(basket));
    basketContainer.appendChild(basketLayout);

    basketContainer.appendChild(createOrderSummary(basket));

    function createColumnHeaders() {
        const headers = document.createElement('div');
        headers.classList.add('basket-column-headers');
        headers.innerHTML = `
        <span></span>
        <span></span>
        <span class="column-header-price">Price</span>
        <span class="column-header-quantity">Quantity</span>
    `;
    return headers;
    }

    function createBasketProduct(item) {
        const row = document.createElement('div');
        row.classList.add('basket-row');

       
        // product image
        const productImage = document.createElement('img');
        productImage.src = item.image || '/media/logo.png';
        productImage.classList.add('basket-product-image');

        // product details
        const productDetails = document.createElement('div');
        productDetails.classList.add('basket-product-details')

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
        quantityInput.min = 1;
        quantityInput.max = item.stock;
        quantityInput.value = item.quantity;

        quantityInput.addEventListener('change', () => {
            let newQuantity = parseInt(quantityInput.value);
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

    function createOrderSummary(basket) {
        const orderSummary = document.createElement('div');
        orderSummary.classList.add('basket-summary');

        let subtotal = 0;

        for (const item of basket) {
            subtotal += item.price * item.quantity;
        }

        const total = subtotal;

        orderSummary.innerHTML = `
        <h3>Order summary</h3>
        <div class="summary-line"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
        <div class="summary-line"><span>Delivery</span><span>Free</span></div>
        <div class="summary-line summary-total"><span>Total</span><span>£${subtotal.toFixed(2)}</span></div>
        <button class="checkout-btn">Proceed to checkout</button>
    `;
    return orderSummary;
    }

    function updateOrderSummary() {
        // Removes old basket summary
        document.querySelector('.basket-summary')?.remove();

        const orderSummary = createOrderSummary(basket);
        document.querySelector('.basket-container').appendChild(orderSummary);

    }
});


