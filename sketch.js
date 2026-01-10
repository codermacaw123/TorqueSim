// Load cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
    updateCartCount();
    updateCartTotal(); // ⭐ recalc total after removing
}

// Update cart count in navbar
function updateCartCount() {
    const count = cart.length;
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Display cart items on cart.html
function updateCartDisplay() {
    const container = document.getElementById("cart-items");

    if (!container) return; // not on cart page

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        updateCartTotal(); // total becomes 0
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <h2>${item.name}</h2>
            <p class="cart-price">Price: $${item.price}</p>
            <button class="btn remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        container.appendChild(div);
    });

    updateCartTotal(); // ⭐ recalc total after rendering
}
function updateCartTotal() {
    const totalEl = document.getElementById("cart-total");
    if (!totalEl) return; // not on cart page

    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });

    totalEl.textContent = total.toFixed(2);
}
// ⭐ THE MISSING PART — attach Add to Cart buttons
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    updateCartDisplay();

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);

            addToCart(name, price);
        });
    });
});
// Calculate and update total price
