# 🛒 Simple Clothing Shop

A minimalist online clothing store with Stripe integration for payments. Products are fetched from a Node.js server using a custom backend API.

## 🔧 Technologies used
- HTML, CSS, JavaScript (frontend)
- Node.js, Express (backend)
- Stripe API for payment processing
- JSON for product management
- CORS for cross-origin request handling

## 🖥️ Backend (server)
The application uses a **Node.js** server with **Express** serving static files from the `public` directory. The server also includes an endpoint for payment processing using **Stripe**:

- **POST `/create-checkout-session`**: Creates a Stripe checkout session with the products selected by the user.
- **GET `/checkout`**: Serves the `checkout.html` file for users who want to complete the payment.
- **GET `/`**: Serves the main `index.html` file.

## 💳 Payment Processing
Stripe is used to create checkout sessions and manage online payments. When the user submits products for processing, they are added to the payment session and sent to Stripe for processing.

## 🔜 To-Do / Future Enhancements
- **Adding product images**: Currently, the app only includes two images for categories (men and women), but I will connect each product in these categories to the Stripe processing system.
- **Creating a product database**: I will connect each product with an external database to offer more products, with images and detailed description.
- **Creating an admin panel**: To add, edit and delete products from the collection on the site.
- **User authentication**: Implementing an authentication system for customers and administrators.
