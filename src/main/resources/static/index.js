const link = document.getElementById("google");
const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");

link.addEventListener("click", function (event) {
    console.log(event.target)
    event.prevenetDefault;
});
function convertToCelsius() {
    const f = parseFloat(fahrenheitInput.value)
    const c = (f - 32) / 1.8
    /*DISPLAY IN TEXT THINGY */
    document.getElementById('result').value = c

}

function convertToFahrenheit() {
    const c = parseFloat(celsiusInput.value)
    const f = (c * 1.8) + 32
    document.getElementById('result').value = f
}






