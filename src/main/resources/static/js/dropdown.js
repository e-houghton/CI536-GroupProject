window.addEventListener('load', async function (evt) {
    const dropdown = document.querySelector("#category");
    const listingDropdown = document.querySelector("#category-dropdown");
    const url = "/api/category/findAll";
    let jsonresponse = {};
    try {
        const response = await fetch(url);
        const items = await response.json();
        console.log(items);
        items.forEach(element => {
            console.log(element);
            optgroup = document.createElement("optgroup");
            optgroup.setAttribute("title", element.description);
            optgroup.setAttribute("label", element.name);
            element.subcategories.forEach(sub => {
                console.log(sub)
                subcat = document.createElement("option");
                subcat.value = sub.subcatID;
                subcat.textContent = sub.name;
                subcat.setAttribute("title", element.description);
                optgroup.appendChild(subcat);
            })
            if (dropdown) {
                dropdown.appendChild(optgroup);
            }

            if (listingDropdown) {
                listingDropdown.appendChild(optgroup.cloneNode(true));
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});