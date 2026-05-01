export async function add(prod) {
    const wishlistModal = document.querySelector("#wishlistModal");
    const closeBtn = wishlistModal.querySelector("#closeBtn");
    const modalContent = wishlistModal.querySelector("#content")
    const dropdown = wishlistModal.querySelector("#wishlistDropdown");
    const submitBtn = wishlistModal.querySelector("#submitWishlist");
    const user = JSON.parse(sessionStorage.getItem('user'));
    closeBtn.addEventListener("click", () => {
        wishlistModal.style.display = "none";
    }
    )
    if (!user) {
        modalContent.innerHTML = "";
        sessionStorage.setItem('redirectAfterLogin', `product.html?id=${prod.prodID}`);
        let para = document.createElement("p");
        para.textContent = "You cannot make a wishlist if you're not logged in!"
        modalContent.appendChild(para);
        let redirectBtn = document.createElement("button");
        redirectBtn.textContent="Click here to log in";
        redirectBtn.addEventListener("click", e => {
            window.location.href = 'login.html';
        })
        modalContent.appendChild(redirectBtn);
        wishlistModal.style.display = "flex";
        return;
    }
    /**
     * if not logged in - cannot add to wishlist without signing in
     * bring up a dropdown to ask which wishlist
     * if none wishlists- create wishlist, name = "NewWishlist"
     */

/*const url = "/api/wishlist/findAllByID/" + user.userID;

try {
    const response = await fetch(url);

    const raw = await response.text();
    console.log("RAW:", raw);

} catch (error) {
    console.log(error);
}*/

    const url = "/api/wishlist/findAllByID/"+user.userID;
    let jsonresponse = {};
    console.log("running");
    try {
        const response = await fetch(url);
        const items = await response.json();
        console.log("Items here")
        console.log(items);
        dropdown.innerHTML="";
        items.forEach(element => {
            let option = document.createElement("option");
            option.setAttribute("title", element.name);
            option.setAttribute("label", element.name);
            option.setAttribute("value", element.wishlistID);
            if (dropdown) {
                dropdown.appendChild(option);
            }


        });

    } catch (error) {
        console.log(error);
    }

    submitBtn.onclick = async () => {
        const wishlistId = dropdown.value;

        if (!wishlistId) {
            alert("Please select a wishlist");
            return;
        }
        const formData = new FormData();
        formData.append("wID", wishlistId);
        formData.append("p", new Blob([JSON.stringify(prod)], {
            type: "application/json"
        }));

        try {
            const response = await fetch("/api/wishlist/addProduct", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Added to wishlist");
                wishlistModal.style.display = "none";
            } else {
                alert("Failed to add");
            }

        } catch (error) {
            console.error(error);
            alert("Error occurred");
        }
    };

    /*console.log("Test");
    console.log(prod);
    console.log(wishlistModal);*/

    wishlistModal.style.display = "flex";

}