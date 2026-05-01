window.addEventListener("load", async () => {
    const btnCreateListing = document.querySelector('.create-listing-btn'),
        user = JSON.parse(sessionStorage.getItem('user')),
        inputSearchTerm = document.querySelector('#input-search-term'),
        btnSearch = document.querySelector('.search-btn'),
        dropdown = document.querySelector("#category");
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
    dropdown.addEventListener('change', async function () {
        const subcatID = this.value;
        window.location=`search.html?subcat=${subcatID}`
    });
    const listingDropdown = document.querySelector("#category-dropdown");
    const url = "/api/category/findAll";
    try {
        const response = await fetch(url);
        const items = await response.json();
        console.log(items);
        items.forEach(element => {
            optgroup = document.createElement("optgroup");
            optgroup.setAttribute("title", element.description);
            optgroup.setAttribute("label", element.name);
            element.subcategories.forEach(sub => {
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

    btnSearch.addEventListener('click', ()=>{
        window.location=`search.html?query=${encodeURIComponent(inputSearchTerm.value.trim())}`
    }
    );
    inputSearchTerm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            window.location=`search.html?query=${encodeURIComponent(inputSearchTerm.value.trim())}`
        }
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const savedSize = localStorage.getItem("fontSize");

    if (savedTheme) {
        applyTheme(savedTheme);

        const select = document.getElementById("cscheme");
        if (select) {
            select.value = savedTheme;
        }
    }

    if (savedSize) {
        document.documentElement.classList.add(savedSize);

        const fontSelect = document.getElementById("fsize");
        if (fontSelect) {
            fontSelect.value = savedSize;
        }
    }
});

//  theme function
function applyTheme(theme) {
    document.documentElement.classList.remove("dark", "colourful");
    document.documentElement.classList.add(theme);
}
