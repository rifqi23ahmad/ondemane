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

    // Tambahkan tabel
    const table = document.createElement('table');
    table.className = 'cart-table';

    // Tambahkan item-item ke tabel
    for (const [name, item] of Object.entries(cart)) {
        const row = document.createElement('tr');

        const itemName = document.createElement('td');
        itemName.className = 'item-name';
        itemName.textContent = name;

        const itemQty = document.createElement('td');
        itemQty.className = 'item-qty';
        itemQty.textContent = item.quantity;

        const itemTotal = document.createElement('td');
        itemTotal.className = 'item-total';
        itemTotal.textContent = formatCurrency(item.totalPrice);

        row.appendChild(itemName);
        row.appendChild(itemQty);
        row.appendChild(itemTotal);

        table.appendChild(row);
    }

    cartItems.appendChild(table);

    // Update total
    cartTotal.innerHTML = `Total Pesanan: ${formatCurrency(total)}`;

    // Aktifkan/Nonaktifkan tombol pesan
    checkoutBtn.disabled = total === 0;
}

function checkout() {
    if (total === 0) return;

    // Title centered with additional spacing
    let orderSummary = 'Onde Mane\n\n';

    // Border line
    const border = '--------------------------------  --------------------  --------------------  --------------------\n';

    // Header and border for better visual separation
    orderSummary += border;

    // Add rows with borders
    for (const [name, item] of Object.entries(cart)) {
        orderSummary += `| ${name.padEnd(30)} | ${item.quantity.toString().padStart(6)} | ${formatCurrency(item.price).padStart(20)} | ${formatCurrency(item.totalPrice).padStart(20)} |\n`;
        orderSummary += border;
    }

    // Total line with border
    orderSummary += `| Total Pesanan: ${formatCurrency(total).padStart(50)} |\n`;
    orderSummary += border;

    // Encode summary for URL
    const encodedSummary = encodeURIComponent(orderSummary);

    // Redirect to WhatsApp
    window.location.href = `https://wa.me/6285174000214?text=${encodedSummary}`;
}
