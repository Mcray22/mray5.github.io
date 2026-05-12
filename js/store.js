function displayProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  let html = "";

  products.forEach((product) => {
    html += `
      <div class="card product-card">
        <div class="card-body">

          <img src="${product.image}" alt="${product.alt}" class="cart-item-img">

          <h3>${product.name}</h3>
          <p><strong>$${product.price.toFixed(2)}</strong></p>
          <p class="product-desc">${product.description}</p>

          <div class="form-row">
            <label for="color-${product.id}">Color</label>
            ${buildSelect(product.colors, "color-" + product.id, product.colors[0])}
          </div>

          <div class="form-row">
            <label for="size-${product.id}">Size</label>
            ${buildSelect(product.sizes, "size-" + product.id, product.sizes[0])}
          </div>

          <div class="form-row">
            <label for="qty-${product.id}">Quantity</label>
            ${buildSelect(product.quantities, "qty-" + product.id, 1)}
          </div>

          <button class="btn" onclick="addToCart(${product.id})">
            Add to Pack
          </button>
        </div>
      </div>
    `;
  });

  productList.innerHTML = html;
}

function addToCart(productId) {
    const product = findProduct(productId);

    const color = document.getElementById("color-" + productId).value;
    const size = document.getElementById("size-" + productId).value;
    const quantity = parseInt(document.getElementById("qty-" + productId).value);

    let cart = getCart();

    const existingItem = cart.find(item =>
        item.productId === productId &&
        item.color === color &&
        item.size === size
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.image,   //  REQUIRED for cart images
            alt: product.alt,       //  REQUIRED for accessibility
            color: color,
            size: size,
            quantity: quantity
        });
    }

    saveCart(cart);

    showCartNotification(productId); // this has to be added in to make sure that the notification will show up when the user clicks the add to cart button
}

// ========================================
// CART NOTIFICATION
// Displays a temporary message when
// an item is added to the cart
// ========================================

function showCartNotification(productId) {
  const product = findProduct(productId);
  const notification = document.createElement("div");

  notification.className = "cart-notification";

  notification.textContent = `${product.name} added to satchel!`;

  document.body.appendChild(notification);

  // slight delay for animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 50);

  // remove notification
  setTimeout(() => {
    notification.classList.remove("show");

    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 2500);
}

