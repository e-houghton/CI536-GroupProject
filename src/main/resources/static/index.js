window.addEventListener('load', async function (evt) {
try {
                const url = "/subcat/add";

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'

                    },
                    body: new URLSearchParams({
                        'email': em,
                        'subject': subject,
                        'message': message
                    })
                });
                const item = await response.text();
                console.log(item);
                const success = Math.random() > 0.25
                if (success) {
                    successDiv.style.display = "block";
                    failDiv.style.display = "";
                    contactDiv.style.display = "none";
                } else {
                    successDiv.style.display = "";
                    failDiv.style.display = "block";
                    contactDiv.style.display = "none";
                }
            } catch (error) {
                console.log(error);
            }


});