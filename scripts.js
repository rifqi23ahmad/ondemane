let cart = {};
let total = 0;

function formatCurrency(value) {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

function addToCart(name, price) {
    if (cart[name]) {
        cart[name].quantity += 1;
        cart[name].totalPrice += price;
    } else {
        cart[name] = {
            price: price,
            quantity: 1,
            totalPrice: price
        };
    }
    total += price;

    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Kosongkan keranjang di tampilan
    cartItems.innerHTML = '';

    // Tambahkan item-item ke tampilan
    for (const [name, item] of Object.entries(cart)) {
        const li = document.createElement('li');

        const itemName = document.createElement('span');
        itemName.className = 'item-name';
        itemName.textContent = name.padEnd(12, ' ');

        const itemQty = document.createElement('span');
        itemQty.className = 'item-qty';
        itemQty.textContent = item.quantity.toString().padStart(2, ' ');

        const itemPrice = document.createElement('span');
        itemPrice.className = 'item-price';
        itemPrice.textContent = formatCurrency(item.price).padStart(20, ' ');

        const itemTotal = document.createElement('span');
        itemTotal.className = 'item-total';
        itemTotal.textContent = formatCurrency(item.totalPrice).padStart(20, ' ');

        li.appendChild(itemName);
        li.appendChild(itemQty);
        li.appendChild(itemPrice);
        li.appendChild(itemTotal);

        cartItems.appendChild(li);
    }

    // Update total
    cartTotal.textContent = `Total: ${formatCurrency(total).padStart(20, ' ')}`;

    // Aktifkan/Nonaktifkan tombol pesan
    checkoutBtn.disabled = total === 0;
}

function checkout() {
    if (total === 0) return;

    let orderSummary = 'Pesanan:\n';
    for (const [name, item] of Object.entries(cart)) {
        orderSummary += `${name.padEnd(12, ' ')} ${item.quantity.toString().padStart(2, ' ')} ${formatCurrency(item.price).padStart(20, ' ')} ${formatCurrency(item.totalPrice).padStart(20, ' ')}\n`;
    }
    orderSummary += `Total: ${formatCurrency(total).padStart(20, ' ')}`;

    // Encode summary untuk URL
    const encodedSummary = encodeURIComponent(orderSummary);

    // Redirect ke WhatsApp
    window.location.href = `https://wa.me/085174000214?text=${encodedSummary}`;
}
