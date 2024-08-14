// Datos Simulados de Productos
const products = [
    {
        id: 1,
        name: 'Camisa Blanca Clásica',
        description: 'Camisa blanca de algodón, ideal para cualquier ocasión.',
        price: 50,
        image: 'images/camisa-blanca.jpg'
    },
    {
        id: 2,
        name: 'Vestido Negro Elegante',
        description: 'Vestido negro perfecto para eventos formales.',
        price: 120,
        image: 'images/vestido-negro.jpg'
    },
    {
        id: 3,
        name: 'Pantalones de Lino',
        description: 'Pantalones ligeros de lino, cómodos y frescos.',
        price: 70,
        image: 'images/pantalones-lino.jpg'
    }
];

// Variables Globales
let cart = [];

// Función para renderizar productos en la página de productos
function renderProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Añadir al Carrito</button>
        `;

        productList.appendChild(productItem);
    });
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);

    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCart();
}

// Función para actualizar la vista del carrito
function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(cartItem => {
        total += cartItem.product.price * cartItem.quantity;

        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        cartItemElement.innerHTML = `
            <h3>${cartItem.product.name}</h3>
            <p>Cantidad: ${cartItem.quantity}</p>
            <p>Precio: $${cartItem.product.price}</p>
            <button onclick="removeFromCart(${cartItem.product.id})">Eliminar</button>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotalElement.innerText = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCart();
}

// Función para manejar el proceso de pago
function handleCheckout(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const card = document.getElementById('card').value;

    if (!name || !address || !card) {
        alert('Por favor, completa toda la información requerida.');
        return;
    }

    alert(`Gracias por tu compra, ${name}! Tu pedido será enviado a ${address}.`);
    cart = [];
    updateCart();
    window.location.href = 'index.html';
}

// Función para cargar detalles del producto en la página de detalles del producto
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = products.find(prod => prod.id === productId);
    if (!product) {
        alert('Producto no encontrado');
        window.location.href = 'products.html';
        return;
    }

    const productDetailSection = document.querySelector('.product-detail');
    productDetailSection.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <p><strong>$${product.price}</strong></p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">Añadir al Carrito</button>
    `;
}

// Simulación de inicio de sesión
function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'user@denver.com' && password === 'password123') {
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
    } else {
        alert('Credenciales incorrectas');
    }
}

// Simulación de registro de usuario
function register(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    } else {
        alert('Por favor, completa toda la información requerida.');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.product-list')) {
        renderProducts();
    }

    if (document.querySelector('.cart-items')) {
        updateCart();
    }

    if (document.getElementById('checkout-form')) {
        document.getElementById('checkout-form').addEventListener('submit', handleCheckout);
    }

    if (document.querySelector('.product-detail')) {
        loadProductDetails();
    }

    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', login);
    }

    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', register);
    }
});