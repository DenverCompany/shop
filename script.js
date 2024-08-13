// Este script es un lugar para agregar interactividad en el futuro
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Producto añadido al carrito.');
        });
    });
});