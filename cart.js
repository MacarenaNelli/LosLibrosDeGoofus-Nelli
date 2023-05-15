let productosDentroCarrito = localStorage.getItem("producto-carrito"); // Se traen los productos que se agregaron al carrito y que quedaron almacenados en el localStorage
productosDentroCarrito = JSON.parse(productosDentroCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoBotones = document.querySelector("#carrito-botones");
const carritoSep = document.querySelector("#carrito-sep");
let botonEliminar = document.querySelectorAll(".carrito-prod-elim");
const botonVaciar = document.querySelector("#carrito-botones-vaciar");
const precioTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-botones-comprar")

function cargarProductosCarrito(){
    if(productosDentroCarrito && productosDentroCarrito.length > 0) { // Si se encuentra vacío devuelve null

        carritoVacio.classList.add("ocultar");
        carritoProductos.classList.remove("ocultar");
        carritoBotones.classList.remove("ocultar");
        carritoSep.classList.add("ocultar");
    
        carritoProductos.innerHTML = "";
    
        productosDentroCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-prod");
            div.innerHTML = `
                <img class="carrito-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-prod-titulo">
                    <small>Título</small>
                    <h4><b>${producto.titulo}</b></h4>
                </div>
                <div class="carrito-prod-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-prod-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-prod-sub">
                    <small>Subtotal</small>
                    <p>$${producto.precio*producto.cantidad}</p>
                </div>
                <button class="carrito-prod-elim" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
    
            carritoProductos.append(div);
        })
    
    
    } else {
        carritoVacio.classList.remove("ocultar");
        carritoProductos.classList.add("ocultar");
        carritoBotones.classList.add("ocultar");
        carritoSep.classList.add("ocultar");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();


function actualizarBotonesEliminar(){
    botonEliminar = document.querySelectorAll(".carrito-prod-elim");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDeCarrito);
    })
}

function eliminarDeCarrito(e){
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #5E707F, #ddbc60)",
            borderRadius: "2rem",
            color: "#ffffff",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Roboto",
            fontSize: "0.8rem",
        },
        onClick: function(){} // Callback after click
        }).showToast();
    const idBoton = e.currentTarget.id;
    const index = productosDentroCarrito.findIndex(producto => producto.id === idBoton);
    
    productosDentroCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("producto-carrito", JSON.stringify(productosDentroCarrito));
    
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: 'Estás seguro?',
        text: "Ésto no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ddbc60',
        cancelButtonColor: '#d33',
        cancelButtonText: "No, no lo vacíes",
        confirmButtonText: 'Si, vacíalo',
        }).then((result) => {
        if (result.isConfirmed) {
            productosDentroCarrito.length = 0;
            localStorage.setItem("producto-carrito", JSON.stringify(productosDentroCarrito));
            cargarProductosCarrito();
            Swal.fire(
            'Carrito vacío!',
            '',
            'success',
            )
        }
    })
}

function actualizarTotal() {
    const totalCalculado = productosDentroCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    productosDentroCarrito.length = 0;
    localStorage.setItem("producto-carrito", JSON.stringify(productosDentroCarrito));
    carritoVacio.classList.add("ocultar");
    carritoProductos.classList.add("ocultar");
    carritoBotones.classList.add("ocultar");
    carritoSep.classList.remove("ocultar");
}