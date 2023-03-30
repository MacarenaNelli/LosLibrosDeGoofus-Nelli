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
        this.productos.push(producto)
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


//Creación de productos (Objetos)
const libro = new Producto("Libro", 6000);
const vinilo = new Producto("Vinilo", 10000);
const cd = new Producto("CD", 7000);

//Agregado de productos al carrito
let opcion = 0;

while(opcion !== 4){
    alert("Elegi el producto que quieras:\n 1 - Libro \n 2 - Vinilo\n 3 - CD\n 4 - Salir");

    opcion = parseInt(prompt("Ingrese su opcion: "));

    switch (opcion){
        case 1:
            pedido.agregarProducto(libro);
            alert("Agregaste un libro");
            break;

        case 2:
            pedido.agregarProducto(vinilo);
            alert("Agregaste un vinilo");
            break;

        case 3:
            pedido.agregarProducto(cd);
            alert("Agregaste un cd");
            break;
        case 4:
            break;

        default:
            alert("Opcion invalida, ingrese de nuevo");
            break;
    }
}

console.log(nombreUsuario + " hizo el siguiente pedido: ");
console.log("Y va a ir a " + direccionPedido);
pedido.mostrarResumen();
console.log("Y va a pagar un total de $" + pedido.calcularTotal());