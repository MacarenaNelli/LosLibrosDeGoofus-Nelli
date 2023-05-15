let productos = [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos)
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numeroCarrito = document.querySelector("#productoEnCarrito");


function cargarProductos(){

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {

        const div =  document.createElement("div");
        div.classList.add("producto", "col-xl-4", "col-lg-4", "col-md-6")
        div.innerHTML = `
                <div class="card border-0 w-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.autor}</p>
                        <button class="producto-agregar btn-form border-0" id="${producto.id}">Lo quiero</button>
                    </div>
                </div>
            </div>    
        `;

        contenedorProductos.append(div);
        
    })

    actualizarBotonesAgregar();
}

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosCarrito;

let productosCarritoLocal = localStorage.getItem("producto-carrito");


if (productosCarritoLocal) {
    productosCarrito = JSON.parse(productosCarritoLocal); //Si tiene productos, los mantiene al recargar la pagina
    actualizacionCantidadCarrito();
} else {
    productosCarrito = []; //Sino los deja en 0
}


function agregarAlCarrito(e) {
    Toastify({
        text: "Producto agregado",
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

    const idButton = e.currentTarget.id; // Utiliza el ID producto
    const productoAgregado = productos.find(producto => producto.id === idButton); // Lo encuentra

    if (productosCarrito.some(producto => producto.id === idButton)) { // Evalua si ya esta en el carrito
        const ind = productosCarrito.findIndex(producto => producto.id === idButton); // Si lo encuentra
        productosCarrito[ind].cantidad++; // Le suma 1 a la propiedad cantidad
    }else {
        productoAgregado.cantidad = 1; // Propiedad cantidad en el Array
        productosCarrito.push(productoAgregado); // Lo agrega al carrito
    }
    actualizacionCantidadCarrito();

    localStorage.setItem("producto-carrito", JSON.stringify(productosCarrito)); //Guardado en localStorage
}

function actualizacionCantidadCarrito(){
    let numeroCarritoAct = productosCarrito.reduce((acu, producto) => acu + producto.cantidad, 0);
    numeroCarrito.innerText = numeroCarritoAct;
}