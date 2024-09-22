const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeImageModal = document.querySelector(".close-image-modal");

document.querySelectorAll(".product img").forEach(image => {
    image.addEventListener('click', function () {
        modalImage.src = this.src;  // Set modal image source to the clicked image
        imageModal.style.display = "block";  // Show the modal
    });       
});

closeImageModal.onclick = function () {
    imageModal.style.display = "none";  // Close the modal
};


// Get modal element
const japarModal = document.getElementById("japar-list-modal");
const openModalBtn = document.getElementById("open-japar-list-btn");
const closeModalBtn = document.querySelector(".close-btn");

// Open modal on button click
openModalBtn.onclick = () => {
    japarModal.style.display = "block";
};

// Close modal on close button
closeModalBtn.onclick = () => {
    japarModal.style.display = "none";
};

// Close modal when clicking outside the modal content
window.onclick = (event) => {
    if (event.target === japarModal) {
        japarModal.style.display = "none";
    }
};
window.onclick = (event) => {
    if (event.target === imageModal) {
        imageModal.style.display = "none";
    }
};

// Cart and Quantity Management
let cart = {};
let total = 0;

function updateQuantity(name, change) {
    if (!cart[name]) {
        const priceText = document.querySelector(`#${name} .product-price`).textContent;
        const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);
        
        cart[name] = {
            price: price,
            quantity: 0,
            totalPrice: 0
        };
    }

    const newQuantity = cart[name].quantity + change;
    if (newQuantity < 0) return;

    cart[name].quantity = newQuantity;
    cart[name].totalPrice = cart[name].price * newQuantity;
    total += change * cart[name].price;

    const quantityDisplay = document.getElementById(`${name}-quantity`);
    if (quantityDisplay) {
        quantityDisplay.textContent = cart[name].quantity;
    }

    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartItems.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'cart-table';

    for (const [name, item] of Object.entries(cart)) {
        if (item.quantity > 0) {
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

    cartTotal.innerHTML = `Total Pesanan: ${formatCurrency(total)}`;
    checkoutBtn.disabled = total === 0;
}
}

function formatCurrency(value) {
    return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}
function checkout() {
    if (total === 0) return;

    let orderSummary = '-------------Onde Mane-------------\n\n';
    orderSummary += 'Qty        Harga            Jajanan\n';
    orderSummary += '---------------------------------------\n';

    let hasItems = false; // Flag to check if there are items with a quantity greater than 0

    for (const [name, item] of Object.entries(cart)) {
        if (item.quantity > 0) {
            hasItems = true; // At least one item with a quantity greater than 0
            
            let quantity = item.quantity.toString().padStart(2);
            let price = formatCurrency(item.price).padStart(15);
            let productName = name.padEnd(14).slice(0, 14);

            orderSummary += `${quantity}    ${price}    ${productName}\n`;
        }
    }

    // Only proceed if there are items in the cart
    if (hasItems) {
        orderSummary += `\n*Total Pesanan:* ${formatCurrency(total).padStart(15)}\n`;

        const encodedSummary = encodeURIComponent(orderSummary);
        window.location.href = `https://wa.me/6285174000214?text=${encodedSummary}`;
    }
}

    function closeModal() {
        modal.style.display = 'none';
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
