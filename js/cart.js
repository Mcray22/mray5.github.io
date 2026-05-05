function displayCartPage() {
    const cartArea = document.getElementById('cart-area');
    if (!cartArea) return;

    const cart = getCart();

    if (cart.length === 0) {
        cartArea.innerHTML = '<div class="empty-cart"><h2>Your cart is empty.</h2></div>';
        return;
    }

    let html = '<div class="cart-card"><h2>Items in Cart</h2>';

    cart.forEach((item, i) => {
        const product = findProduct(item.productId);

        html += `<div class="cart-row">
            <img src="${item.image}" alt="${item.alt}" class="cart-item-img">

            <div>
                <div class="cart-item-title">${item.name}</div>
                <div>$${item.price.toFixed(2)} each</div>
            </div>

            <div>
                <label>Color</label>
                ${buildCartSelect(product.colors, item.color, i, 'color')}
            </div>

            <div>
                <label>Size</label>
                ${buildCartSelect(product.sizes, item.size, i, 'size')}
            </div>

            <div>
                <label>Qty</label>
                ${buildCartSelect(product.quantities, item.quantity, i, 'quantity')}
            </div>

            <div>
                <label>Total</label>
                <div>$${(item.price * item.quantity).toFixed(2)}</div>
            </div>

            <button class="remove-button" onclick="removeItem(${i})">Remove</button>
        </div>`;
    });

    html += `</div>
        <div class="total-box">
            <h2>Total: $${getCartTotal(cart).toFixed(2)}</h2>
            <a class="action-button primary-button" href="checkout.html">Proceed to Dispatch</a>
        </div>`;

    cartArea.innerHTML = html;
}

function changeOption(index, fieldName, value) {
    const cart = getCart();

    cart[index][fieldName] = fieldName === 'quantity' ? parseInt(value) : value;

    saveCart(cart);
    displayCartPage();
}

function removeItem(index) {
    const cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    displayCartPage();
}