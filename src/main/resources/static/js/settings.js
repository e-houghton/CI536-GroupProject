window.addEventListener("load", () => {
    const schemeSelect = document.getElementById("cscheme");
    const logout = document.querySelector("#logOutButton");
    logout.addEventListener("click", () => {
        sessionStorage.removeItem("user"); 
        window.location="index.html";
    });
    if (schemeSelect) {
        schemeSelect.addEventListener("change", function () {
            applyTheme(this.value);
            localStorage.setItem("theme", this.value);
        });
    }
    // font size
    const fontSelect = document.getElementById("fsize");

    if (fontSelect) {
        fontSelect.addEventListener("change", function () {
            document.documentElement.classList.remove("small", "medium", "large");
            document.documentElement.classList.add(this.value);
            localStorage.setItem("fontSize", this.value);
        });
    }
});

