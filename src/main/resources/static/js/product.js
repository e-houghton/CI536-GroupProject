window.addEventListener('load', async function (e) {
    // URLSearchParams api for url query strings
    const parameters = new URLSearchParams(window.location.search),
        btnCreateListing = document.querySelector('.create-listing-btn'),
        productId = parameters.get('id'),
        user = JSON.parse(sessionStorage.getItem('user')),
        productContainer = document.querySelector('.product-container');

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

    try {
        const response = await fetch(`/api/product/find/${productId}`);
        const product = await response.json();

        const productImages = await getProductImages(product.imageLocation);
        let currIndexPosition = 0;

        // Image gallery for the product's images
        const imageGallery = document.createElement('div');
        imageGallery.classList.add('image-gallery');

        const mainImage = document.createElement('img');
        mainImage.src = productImages[0];
        mainImage.classList.add('main-image');

        // previous and next buttons that allow users to flick through images

        const btnPreviousImage = document.createElement('button');
        btnPreviousImage.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        btnPreviousImage.classList.add('gallery-btn', 'gallery-btn-left');
        btnPreviousImage.addEventListener('click', () => {
            currIndexPosition = (currIndexPosition - 1 + productImages.length) % productImages.length;
            mainImage.src = productImages[currIndexPosition];
        });

        const btnNextImage = document.createElement('button');
        btnNextImage.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        btnNextImage.classList.add('gallery-btn', 'gallery-btn-right');
        btnNextImage.addEventListener('click', () => {
            currIndexPosition = (currIndexPosition + 1) % productImages.length;
            mainImage.src = productImages[currIndexPosition];
        });

        const btnWishlistProduct = document.createElement('button');
        btnWishlistProduct.innerHTML = '<i class="fa-regular fa-heart"></i>';
        btnWishlistProduct.classList.add('wishlist-product-btn');
        btnWishlistProduct.addEventListener('click', (e) => {
            // Stops the image zoom in  when user wishlists item
            e.stopPropagation();
            const icon = btnWishlistProduct.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        });

        imageGallery.appendChild(btnPreviousImage);
        imageGallery.appendChild(mainImage);
        imageGallery.appendChild(btnNextImage);
        imageGallery.appendChild(btnWishlistProduct);

        // Product detail and bag button area
        // Prod name, prod desc, prod upload date, prod seller, prod price, prod quantity, prod category, prod sold status

        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        const productName = document.createElement('h3');
        productName.textContent = product.name;

        const productSeller = document.createElement('p');
        productSeller.textContent = `Sold by ${product.seller.username}`;
        productSeller.classList.add('seller');

        const productPrice = document.createElement('h2');
        productPrice.textContent = ` £${product.price.toFixed(2)}`;

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;

        const btnAddToBasket = document.createElement('button');
        btnAddToBasket.textContent = 'Add to basket';
        btnAddToBasket.classList.add('add-to-basket-btn');


        productDetails.appendChild(productName);
        productDetails.appendChild(productSeller);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(productDescription);
        productDetails.appendChild(btnAddToBasket);

        const productRow = document.createElement('div');
        productRow.classList.add('product-row');
        productRow.appendChild(imageGallery);
        productRow.appendChild(productDetails);

        productContainer.appendChild(productRow);

        // Lightbox
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.style.display = 'none';

        const lightboxImage = document.createElement('img');
        lightboxImage.classList.add('lightbox-image');

        const btnPreviousLightbox = document.createElement('button');
        btnPreviousLightbox.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        btnPreviousLightbox.classList.add('lightbox-btn', 'lightbox-btn-left');

        const btnNextLightbox = document.createElement('button');
        btnNextLightbox.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        btnNextLightbox.classList.add('lightbox-btn', 'lightbox-btn-right');

        const btnCloseLightbox = document.createElement('button');
        btnCloseLightbox.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        btnCloseLightbox.classList.add('close-lightbox');

        lightbox.appendChild(btnCloseLightbox);
        lightbox.appendChild(btnPreviousLightbox);
        lightbox.appendChild(lightboxImage);
        lightbox.appendChild(btnNextLightbox);
        document.body.appendChild(lightbox);

        // lightbox is opened when an image is clicked
        mainImage.addEventListener('click', () => {
            lightboxImage.src = productImages[currIndexPosition];
            lightbox.style.display = 'flex';
        });

        // Lightbox close
        btnCloseLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // background click closing
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // lightbox navigation

        btnPreviousLightbox.addEventListener('click', (e) => {
            e.stopPropagation();
            currIndexPosition = (currIndexPosition - 1 + productImages.length) % productImages.length;
            lightboxImage.src = productImages[currIndexPosition];
            mainImage.src = productImages[currIndexPosition];
        });

        btnNextLightbox.addEventListener('click', (e) => {
            e.stopPropagation();
            currIndexPosition = (currIndexPosition + 1) % productImages.length;
            lightboxImage.src = productImages[currIndexPosition];
            mainImage.src = productImages[currIndexPosition];
        });


        // NAME DESCRIPTION PRICE QUANTITY SELLER ETC NEXT TO ITEM IMAGE ON THE RIGHT
        // BELOW THESE HAVE THE ADD TO BAG BUTTON,
        // ADD TO BAG BUTTON ADDS (1) TO THE TROLLEY ICON, 
        // IN DB ADDS PRODUCT TO TROLLEY
        // IF USER ADDS TO BAG TWICE SAY QUANTITY UP BY 2 
        // HOVER OVER TROLLEY TO SHOW LIST OF OBJECTS IN TROLLEY?

        // ADD LISTENER TO PRODUCT CARD TO FLICK THROUGH PRODUCT IMAGES
        // < > IN THE CORNERS TO FLICK THRU IMAGES
        // X IN THE CORNER TO GO OUT TO THE MAIN AREA AGAIN
        // MAYBE - + BUTTONS TO ZOOM IN AND OUT 

        //   productCard.addEventListener('click', () => {
        //       window.location.href = `product.html?id=${product.prodID}`;
        //   });
    } catch (err) {
        console.error(err)
    }

});

async function getProductImages(imageLocation) {
    const productImages = [];
    let i = 0;
    while (true) {
        const url = `/media/productImages/${imageLocation}/${i}.png`;
        try {
            const imageResponse = await fetch(url, { method: 'HEAD' });
            if (!imageResponse.ok) {
                break;
            }
            productImages.push(url);
            i++;
        } catch {
            break;
        }
    }
    return productImages;
}