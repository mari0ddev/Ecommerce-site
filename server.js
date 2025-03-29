require("dotenv").config()

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://for-cv-seven.vercel.app" }));


const storeItems = new Map([
    [1, { priceInCents: 19900, name: "Tricou M|clothing x Champion" }],
    [2, { priceInCents: 27000, name: "Hanorac M|clothing" }],
]);

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: "ron",
                        product_data: { name: storeItem.name },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.CLIENT_URL}/success.html`,
            cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3000, () => console.log("Server pornit pe http://localhost:5500"));
