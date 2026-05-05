function initShippingPage() {
    displayShippingPage();
    const form = document.getElementById('shipping-form');
    if (form) form.addEventListener('submit', submitShippingForm);
}

function displayShippingPage() {
    const summaryBox = document.getElementById('shipping-summary');
    if (!summaryBox) return;

    const cart = getCart();
    let html = cart.map(item => `
        <div class="summary-line">
            <span>${item.name} (${item.size}, ${item.color}) x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>`).join('');

    html += `<div class="summary-line"><strong>Total</strong><strong>$${getCartTotal(cart).toFixed(2)}</strong></div>`;
    summaryBox.innerHTML = html;
}

function submitShippingForm(event) {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    document.getElementById('shipping-message').innerHTML = `<div class="message-box">Order placed for ${fullName}!</div>`;
    localStorage.removeItem('cart');
    event.target.reset();
    displayShippingPage();
}