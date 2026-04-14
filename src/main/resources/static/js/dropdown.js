window.addEventListener('load', async function (evt) {
    const dropdown = document.querySelector("#category");
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
                subcat.textContent = sub.name;
                subcat.setAttribute("title", element.description);
                optgroup.appendChild(subcat);
            })
            dropdown.appendChild(optgroup)
        });
        
    } catch (error) {
        console.log(error);
    }
});