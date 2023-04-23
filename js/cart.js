const productosDentroCarrito = JSON.parse(localStorage.getItem("producto-carrito")); // Traigo productos agregados al carrito y almacenados en el localStorage


const cartVacio = document.querySelector("#cart-vacio");
const cartProductos = document.querySelector("#cart-productos");
const cartBotones = document.querySelector("#cart-botones");
const cartCompra = document.querySelector("#cart-compra");
const cartTotal = document.querySelector('#cart-total');


if(productosDentroCarrito) { // si esta vacio devuelve null

    cartVacio.classList.add("d-none");
    cartProductos.classList.remove("d-none");
    cartBotones.classList.remove("d-none");
    cartCompra.classList.remove("d-none");

} else {

}