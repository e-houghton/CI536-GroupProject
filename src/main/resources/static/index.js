window.addEventListener('load', async function (evt) {
q1out = document.querySelector("#q1out");
            const url = "/db/showAll";

            try {
                const response = await fetch(url);
                const item = await response.json();
                q1out.textContent = JSON.stringify(item);
            } catch (error) {
                console.log(error);
            }


});