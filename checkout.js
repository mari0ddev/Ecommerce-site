
        const button = document.getElementById("checkout-button");

        button.addEventListener("click", () => {
            fetch("http://localhost:3000/create-checkout-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        { id: 1, quantity: 3 },
                        { id: 2, quantity: 1 }
                    ],
                }),
            })
            .then((res) => res.json())
            .then(({ url }) => {
               
                window.location.href = url;
            })
            .catch((err) => {
                console.error("Error:", err);
            });
        });
