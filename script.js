document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector(".add-to-cart");
  const sizeButtons = document.querySelectorAll(".size-options button");
  const cartContainer = document.getElementById("cart-container"); // Unde afișăm produsele
  const totalElement = document.getElementById("total"); // Unde afișăm totalul
  const checkoutButton = document.getElementById("checkout-button"); // Buton checkout Stripe

  let selectedSize = null;

  // 🟢 1. Selectăm mărimea
  sizeButtons.forEach(button => {
      button.addEventListener("click", function () {
          sizeButtons.forEach(btn => btn.classList.remove("active"));
          this.classList.add("active");
          selectedSize = this.textContent; // Salvăm mărimea aleasă
      });
  });

  // 🟢 2. Funcția pentru actualizarea coșului
  function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    cartContainer.innerHTML = ""; // Curățăm coșul înainte de actualizare

    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item"); // Adaugă clasă pentru styling
        div.innerHTML = `
            <p>${item.quantity} x ${item.name} - Mărime: ${item.size} - ${item.price} LEI</p>
            <button class="remove-item" data-index="${index}">Șterge</button>
        `;
        cartContainer.appendChild(div);

        total += item.price * item.quantity;
    });

    totalContainer.textContent = `Total: ${total} LEI`;

    // Eveniment pentru butoanele de ștergere
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            cart.splice(index, 1);
            updateCart();
        });
    });
}

      });

      totalElement.textContent = `Total: ${total} LEI`;

      // 🟢 3. Ștergerea produselor din coș
      document.querySelectorAll(".remove-item").forEach(button => {
          button.addEventListener("click", function () {
              const index = this.getAttribute("data-index");
              cart.splice(index, 1); // Eliminăm produsul
              localStorage.setItem("cart", JSON.stringify(cart));
              updateCart(); // Actualizăm vizual coșul
          });
      });
  

  // 🟢 4. Adăugare în coș
  addToCartButton.addEventListener("click", () => {
      if (!selectedSize) {
          alert("Te rog să selectezi o mărime!");
          return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];


      cart.push(newItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart(); // Actualizăm coșul după adăugare
      alert(`Adăugat în coș: Tricou Champion - Mărime ${selectedSize}`);
  });

  // 🟢 5. Inițializăm coșul la încărcarea paginii
  updateCart();

  // 🟢 6. Integrare Stripe Checkout
  checkoutButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
          alert("Coșul este gol! Adaugă produse înainte de a continua.");
          return;
      }

      // Pregătim produsele pentru Stripe
      let itemsForStripe = cart.map(item => ({
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity
      }));

      fetch("https://for-cv-dun.vercel.app/create-checkout-session", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: itemsForStripe }),
      })
      .then((res) => res.json())
      .then(({ url }) => {
          window.location.href = url; // Redirecționează utilizatorul către Stripe Checkout
      })
      .catch((error) => {
          console.error("Eroare la crearea sesiunii checkout:", error);
      });
  });

  
  