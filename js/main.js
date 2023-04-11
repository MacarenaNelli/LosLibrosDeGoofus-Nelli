//Clases
class Producto {
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Pedido {
    constructor(direccion, formaDePago){
        this.direccion = direccion; 
        this.formaDePago = formaDePago; 
        this.productos = []; 
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    calcularTotal() {
        let total = 0;
        for (let i = 0; i < this.productos.length ; i++) {
            total = total + this.productos[i].precio;
        }
        return total;
    }

    mostrarResumen() {
        console.log("Productos: \n");
        for(let i = 0; i < this.productos.length; i++){
            console.log("- " + this.productos[i].nombre + " | Precio: $" + this.productos[i].precio)
        }
    }
}

function muestraProductos(productos) {
    let lproductos = "";
    for (let i = 0; i < productos.length; i++){
        lproductos += "- " + productos[i].nombre + "\n";  
    }
    alert("Listado de productos:\n" + lproductos);
}

// Array de productos
const productos = [
    new Producto("Libro", 6000),
    new Producto("Vinilo", 10000),
    new Producto("CD", 7000),
    new Producto("Agenda", 5000)
];

// Pedido de datos
const nombreUsuario = prompt("¿Cuál es tu nombre?");
alert("Bienvenido " + nombreUsuario);

let emailUsuario = prompt("Indicanos tu email");

let verificacion = parseInt(prompt("El email ingresado es " + emailUsuario + ". Es correcto? \n 1 - Si \n 2 - No"));

while(verificacion !== 1){
    alert("Su email es incorrecto, por favor vuelva a ingresarlo");
    emailUsuario = prompt("Indicanos tu email");
    verificacion = parseInt(prompt("El email ingresado es " + emailUsuario + ". Es correcto? \n 1 - Si \n 2 - No"));
}

alert("Su email fue ingresado de forma correcta");
const direccionPedido = prompt("¿Cuál es tu dirección?");

let formaPago = prompt("¿Cómo vas a abonar? \n 1 - Débito \n 2 - Crédito \n 3 - Efectivo");
while(formaPago < 1 || formaPago > 3){
    alert("Forma de pago inválido, por favor vuelva a ingresar.");
    formaPago = prompt("1 - Débito \n 2 - Crédito \n 3 - Efectivo");
}

//Creación de pedido (Objeto)
const pedido = new Pedido(direccionPedido,formaPago);

//Agregado de productos al carrito
let opcion = 0;

//Ejecución de la función
muestraProductos(productos);

while(opcion !== 5){

    opcion = parseInt(prompt("Ingrese su opcion: "));

    switch (opcion){
        case 1:
            pedido.agregarProducto(productos[0]);
            alert("Agregaste un libro");
            break;

        case 2:
            pedido.agregarProducto(productos[1]);
            alert("Agregaste un vinilo");
            break;

        case 3:
            pedido.agregarProducto(productos[2]);
            alert("Agregaste un cd");
            break;

        case 4:
            pedido.agregarProducto(productos[3]);
            alert("Agregaste una agenda");
            break;

        case 5:
            break;

        default:
            alert("Opción inválida, ingrese de nuevo");
            break;
        }
}

console.log(nombreUsuario + " hizo el siguiente pedido: ");
console.log("Y va a ir a " + direccionPedido);
pedido.mostrarResumen();
console.log("Y va a pagar un total de $" + pedido.calcularTotal()); 