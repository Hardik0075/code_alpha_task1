document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    function populateCheckout() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `<img src="${item.img}" alt="${item.name}"><span>${item.name} - $${item.price} x ${item.quantity}</span>`;
            cartItemsContainer.appendChild(li);
        });
        totalElement.textContent = total.toFixed(2);
    }

    document.querySelector('.complete-order').addEventListener('click', () => {
        localStorage.removeItem('cartItems');
        alert('Order placed successfully!');
        window.location.href = 'index.html';
    });

    populateCheckout();
});
``
