// Creación de productos

const productos = [
    {
        id: "el-gato-que-amaba-los-libros",
        titulo: "El gato que amaba los libros",
        imagen: "./images/el-gato-que-amaba-los-libros.png",
        autor: "Sōsuke Natsukawa",
        precio: 3000
    },

    {
        id: "el-secreto-de-las-flores",
        titulo: "El secreto de las flores",
        imagen: "./images/el-secreto-de-las-flores.jpg",
        autor: "Valérie Perrin",
        precio: 3200
    },

    {
        id: "en-el-bosque-oscuro",
        titulo: "En el bosque oscuro",
        imagen: "./images/en-el-bosque-oscuro.jpg",
        autor: "Dale Bailey",
        precio: 2500
    },

    {
        id: "el-tiempo-de-las-moscas",
        titulo: "El tiempo de las moscas",
        imagen: "./images/el-tiempo-de-las-moscas.jpg",
        autor: "Claudia Piñeiro",
        precio: 3600
    },

    {
        id: "las-huellas-del-mal",
        titulo: "Las huellas del mal",
        imagen: "./images/las-huellas-del-mal.jpg",
        autor: "Federico Andahazi",
        precio: 2950
    },

    {
        id: "ensayo-sobre-la-ceguera",
        titulo: "Ensayo sobre la ceguera",
        imagen: "./images/ensayo-sobre-la-ceguera.jpg",
        autor: "José Saramago",
        precio: 3300
    },

    {
        id: "los-hijos-de-los-dias",
        titulo: "Los hijos de los días",
        imagen: "./images/los-hijos-de-los-dias.jpg",
        autor: "Eduardo Galeano",
        precio: 3500
    },

    {
        id: "nunca-me-abandones",
        titulo: "Nunca me abandones",
        imagen: "./images/nunca-me-abandones.jpg",
        autor: "Kazuo Ishiguro",
        precio: 2700
    },

    {
        id: "tan-poca-vida",
        titulo: "Tan poca vida",
        imagen: "./images/tan-poca-vida.jpg",
        autor: "Hanya Yanagihara",
        precio: 3200
    },

];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let numeroCarrito = document.querySelector(".productoEnCarrito");


function cargarProductos(){

    productos.forEach(producto => {

        const div =  document.createElement("div");
        div.classList.add("producto", "col-xl-4", "col-lg-4", "col-md-6")  
        div.innerHTML = `
                <div class="card border-0 w-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.autor}</p>
                        <button class="producto-agregar btn-form border-0" id="${producto.id}">¡LO QUIERO!</button>
                    </div>
                </div>
            </div>    
        `;

        contenedorProductos.append(div);
        
    })

    actualizarBotonesAgregar();
}

cargarProductos();

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

const productosCarrito = []; //Array de productos agregados al carrito

function agregarAlCarrito(e) {

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
    let numeroCarritoAct = productosCarrito.reduce((a, producto) => a + producto.cantidad, 0);
    numeroCarrito.innerText = numeroCarritoAct;
}