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
            optgroup.textContent = element.name
            element.subcategories.forEach(sub => {
                subcat = this.document.createElement("option");
                subcat.textContent = sub.name;
                subcat.setAttribute("title", element.description);
            })
        });
    } catch (error) {
        console.log(error);
    }
});