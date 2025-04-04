import React from "react";

const Checkout = ({ cart }) => {
    const handlePayment = async () => {
        const response = await fetch("http://localhost:3000/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cart }),
        });

        const { url } = await response.json();
        window.location.href = url;
    };

    return (
        <div>
            <h2>Finalizează comanda</h2>
            <button onClick={handlePayment}>Plătește cu Stripe</button>
        </div>
    );
};

export default Checkout;
 