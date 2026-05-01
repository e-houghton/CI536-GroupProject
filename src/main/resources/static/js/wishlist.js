window.addEventListener("load", async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const container = document.getElementById("wishlist-cont");
    const dropdown = document.querySelector("#wlSelect");
    const newWishlistName = document.querySelector("#nwlIn");
    const newWishlistSub = document.querySelector("#nwl");

    newWishlistSub.addEventListener("submit", async e => {
        e.preventDefault();
        await fetch('http://localhost:8080/api/wishlist/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "ownerID": user.userID, "name": newWishlistName.value })
        });
        await new Promise(r => setTimeout(r, 100));
        window.location.reload();

    });
    console.log(dropdown);
    if (!user) {
        container.innerHTML = "<p>Please log in to view your wishlist.</p>";
        return;
    }


    dropdown.addEventListener("change", async () => {
        console.log("updating!")
        container.innerHTML = "";
        let hasItems = false;
        try {
            const wl = await fetch(`/api/wishlist/find/${dropdown.value}`);
            const wishlist = await wl.json();
            console.log(wishlist);
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


            if (!hasItems) {
                container.innerHTML = "<p>Your wishlist is empty.</p>";
            }

        } catch (err) {
            console.error(err);
            container.innerHTML = "<p>Error loading wishlist.</p>";
        }
    })

    try {
        const res = await fetch(`/api/wishlist/findAllByID/${user.userID}`);
        const wishlists = await res.json();
        console.log(wishlists);
        if (!Array.isArray(wishlists) || wishlists.length === 0) {
            container.innerHTML = "<p>No wishlists found.</p>";
            return;
        }
        dropdown.style.display = "flex";


        wishlists.forEach(wishlist => {
            const option = document.createElement("option");
            option.setAttribute("title", wishlist.name);
            option.setAttribute("label", wishlist.name);
            option.setAttribute("value", wishlist.wishlistID);
            if (dropdown) {
                dropdown.appendChild(option);
            }
            console.log(wishlist);
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Error loading wishlist.</p>";
    }
});