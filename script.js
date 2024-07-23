document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const products = document.querySelectorAll('.product');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => {
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h2').textContent;
            const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));
            const productImg = product.querySelector('img').src;
            addItemToCart(productId, productName, productPrice, productImg);
        });
    });

    function addItemToCart(id, name, price, img) {
        const cartItem = cartItems.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItems.push({ id, name, price, img, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCart();
    }

    function updateCart() {
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

    updateCart();
});
