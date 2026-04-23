const schemeSelect = document.getElementById("cscheme");

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
        document.documentElement.classList.remove("small","medium","large");
        document.documentElement.classList.add(this.value);
        localStorage.setItem("fontSize", this.value);
});
}

// theme
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
function applyTheme(theme){
    document.documentElement.classList.remove("dark", "colourful");
    document.documentElement.classList.add(theme);
}

