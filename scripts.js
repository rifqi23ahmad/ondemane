document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product');
            const id = productElement.dataset.id;
            const name = productElement.querySelector('h2').textContent;
            const priceText = productElement.querySelector('p').textContent;
            const price = parseInt(priceText.replace('Rp ', '').replace('.', ''));
            
            const item = cart.find(cartItem => cartItem.id === id);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        // Membuat judul pesan
        let message = 'Pesanan Anda:\n';
        
        // Menambahkan header kolom
        message += '=========================\n';
        message += 'Nama Produk | Qty | Harga\n';
        message += '=========================\n';
        
        // Menambahkan daftar produk dari keranjang
        message += cart.map(item => 
            `${item.name} | ${item.quantity} | Rp ${formatRupiah(item.price * item.quantity)}`
        ).join('\n');
        
        // Menambahkan total keseluruhan
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n=========================\n`;
        message += `Total: Rp ${formatRupiah(total)}\n`;
    
        // Membuat URL WhatsApp dengan pesan yang telah diformat
        const whatsappUrl = `https://wa.me/6285174000214?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
    
    
    

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.textContent = `${item.name} (${item.quantity}) - Rp ${formatRupiah(item.price * item.quantity)}`;
            cartItemsElement.appendChild(li);
        });
        cartTotalElement.textContent = `Rp ${formatRupiah(total)}`;
    }

    function formatRupiah(value) {
        // Format sebagai mata uang IDR tanpa desimal
        return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    }
    
});
