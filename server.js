require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const path = require("path");

const app = express();

// Middleware pentru procesarea cererilor JSON
app.use(express.json());
app.use(cors());

// Servește fișierele statice din folderul "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutele pentru checkout și succes
app.get("/checkout", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    // Asigură-te că clientul trimite un obiect valid
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: "Nu au fost trimise produse valide." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: "ron",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Prețul în cenți
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/index.html`, // Redirecționare după anulare
    });

    // Returnează URL-ul sesiunii Stripe pentru redirect
    res.json({ url: session.url });
  } catch (err) {
    console.error("Eroare la Stripe:", err);
    res.status(500).json({ error: "A apărut o eroare la procesarea plății." });
  }
});

// Servește fișierul index.html la accesarea rădăcinii
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5500, () => console.log("Server running on port 5500"));
