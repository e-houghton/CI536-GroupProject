window.addEventListener("load", async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const container = document.getElementById("wishlist-cont");

    if (!user) {
        container.innerHTML = "<p>Please log in to view your wishlist.</p>";
        return;
    }

    try {
        const res = await fetch(`/api/wishlist/findAllByID/${user.userID}`);
        const wishlists = await res.json();

        if (!Array.isArray(wishlists) || wishlists.length === 0) {
            container.innerHTML = "<p>No wishlists found.</p>";
            return;
        }

        let hasItems = false;

        wishlists.forEach(wishlist => {
            if (!wishlist.items || wishlist.items.length === 0) return;

            wishlist.items.forEach(item => {
                const product = item.product;
                if (!product) return;

                hasItems = true;

                const card = document.createElement("div");
                card.classList.add("product-card");

                const img = document.createElement("img");
                img.src = `/media/productImages/${product.imageLocation}/0.png`;
                img.alt = product.name;

                const title = document.createElement("h3");
                title.textContent = product.name;

                const price = document.createElement("p");
                price.textContent = `£${product.price}`;

                card.addEventListener("click", () => {
                    window.location.href = `product.html?id=${product.prodID}`;
                });


                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(price);

                container.appendChild(card);
            });
        });

        if (!hasItems) {
            container.innerHTML = "<p>Your wishlist is empty.</p>";
        }

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Error loading wishlist.</p>";
    }
});