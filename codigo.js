// validaciones
function Validar() {

    let userLogin = document.getElementById("user");
    let emaiLogin = document.getElementById("email");
    let pswLogin = document.getElementById("psw");
    let parrafo = document.getElementById("warnings");

    formlogin.addEventListener("submit", e => {
        e.preventDefault()
        let warnings = ""
        let entrar = false
        let expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (userLogin.value.length < 4) {
            warnings += `El nombre de usuario debe tener 4 caracteres como minimo y formato email <br>`;
            entrar = true;

        }
        if (!expresion.test(emaiLogin.value)) {
            warnings += `Correo invalido <br>`;
            entrar = true;

        }
        if (pswLogin.value.length < 6) {
            warnings += `Contraseña invalida <br>`;
            entrar = true;


        }
        if (entrar) {
            parrafo.innerHTML = warnings;

        } else {

            localStorage.emaiLogin = emaiLogin.value;
            localStorage.pswLogin = pswLogin.value;
            window.location = "login.html";


        }
    })

}

function Ingresar() {
    window.location = "index.html";
}

function login() {

    emaiLogin = localStorage.emaiLogin;
    pswLogin = localStorage.pswLogin;
    let email = document.getElementById("email1").value;
    let psw = document.getElementById("psw1").value;
    if ((emaiLogin == email) && (pswLogin == psw)) {
        window.location = "index.html";

    } else if ((emaiLogin == email) && (pswLogin != psw)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña incorrecta!',

        });
    } else if ((emaiLogin != email) && (pswLogin == psw)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email Incorrecto!',

        });
    } else if ((emaiLogin != email) && (pswLogin != psw)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos incorrectos!',

        });
    }

}



//-------------------------------------------------------fin login --------------------------------------------------------



let total = 0;
let pedido = [];
let respaldo = [];
const imagenes = document.getElementById("seleccion");
const cantidad = document.getElementById("ingreso");



//array vcacio para traer el json
let productos = [];

//importo los objetos del json al array productos
fetch('./stock.json')
    .then(resp => resp.json())
    .then(data => {
        productos = data;
        //console.log(data)


        productos.forEach((producto) => {

            const article = document.createElement("div");
            article.classList.add('seleccion-imagen')
            article.id = `${producto.id}`
            article.innerHTML = `
            <div class="card bg-dark text-center" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top seleccion-imagen" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title seleccion-imagen">${producto.nombre}</h5>
                    <p class="card-text"> $ ${producto.precio}</p>
                    <button id="${producto.id}" class="seleccion-imagen btn btn-secondary" >Comprar</button>
                </div>
            </div>`
            imagenes.append(article)
        })


        //crea un nuevo array , el query selecciona el div del objeto por su ID por medio de target.getAttribute
        let ElementosClick = new Array();
        document.querySelectorAll(".seleccion-imagen").forEach(el => {
            el.addEventListener("click", event => {
                const id = event.target.getAttribute("id");

                event.stopPropagation();

                //compara el numero de ID del nuevo array con el de los prod en stock[productos] y los ingresa al array pedidos[]
                productos.forEach((producto) => {
                    if (producto.id == id) {
                        pedido.push(producto);

                        respaldo.push(producto);
                        lista()
                        botonTotal()

                    }

                });

            })

        })

    })



//lista el pedido en la tabla
const lista = () => {


    document.getElementById('tabla1')
    const cuerpo = document.createElement('tbody');
    pedido.reverse();
    pedido.forEach((producto) => {
        pedido = [];
        cuerpo.innerHTML = `<h6><td  class="pedido">${producto.nombre}</td></h6>
            <h6><td  class="precio">${producto.precio}</td></h6>`

        // llamo a la funcion total monto 
        totalMonto();
        //borro el ultimo elemento del array de respaldo con POP para evitar la duplicación
        // console.log(respaldo.length)
        respaldo.pop()

    })

    tabla1.append(cuerpo)

}




// genera el boton Total en el dom y llama la funcion boton pagar
const botonTotal = () => {
    document.getElementById("botonTotal").innerHTML = `
    
        <form action="#" class="btn-center" id="formulario">
    
        <button id="enviar" class="text-center btn btn-danger mx-auto " type="submit" style="display:''">TOTAL</button>
        </form>
        
        `
    botonPagar()
}



//calcula el total
const totalMonto = () => {
    respaldo.forEach((producto) => {
        total = total + (producto.precio)
        document.getElementById("total").innerHTML = `<h5> Total $: ${total.toFixed(2)}!!!</h5>`

    })

}



// selleciona el boton enviar que llama a la funcion pago
const botonPagar = () => {
    const pago = document.getElementById("enviar")
    pago.addEventListener('click', (e) => {
        e.preventDefault()
        console.log(e)
        activaModal();


    })
}




// la funcion selecciona el tipo de pago , introduce los botones para efectivo y tarjeta
const tipoDePago = () => {
    document.getElementById("cuerpoModal").innerHTML = `
    <div class="btn mx-auto">
        <form action="#" class="mx-auto" id="pagar">
            <button id="efectivo" class="btn btn-secondary mx-auto"  type="submit">EFECTIVO</button>
            <button id="pagarTarjeta" class="btn btn-secondary mx-auto" type="submit">TARJETA</button>
        </form>
    </div>
    `
    const efectivo = document.getElementById("efectivo")
    efectivo.addEventListener('click', () => {
        pagoEfectivo();
    })

    const tarjeta = document.getElementById("pagarTarjeta")
    tarjeta.addEventListener('click', () => {
        pagoTarjeta();

    })
}


const pagoEfectivo = () => {
    document.getElementById("cuerpoModal").innerHTML = `
    <form action="#" class="" id="pagar">
        <h2> <input id ="efectivo" name="pagar" type="number"> Ingrese el monto </h2>
        <button id="" class="boton" type="submit">PAGAR</button>
    </form>
`
    const inputEfectivo = document.getElementById("efectivo")
    const pagar = document.getElementById("pagar")
    pagar.addEventListener("submit", (e) => {
        e.preventDefault();
        const efectivo = inputEfectivo.value;
        const vuelto = efectivo - total;

        if (efectivo < total) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese un Monto valido!',

            })
            pagoEfectivo()

        } else {

            document.getElementById("cuerpoModal").innerHTML = `
       
            <h2> Su vuelto es : $ ${vuelto} </h2>
            
            `

            resetear();
        }
    })
}



const pagoTarjeta = () => {
    document.getElementById("cuerpoModal").innerHTML = `
    <form action="#" class="" id="pagarTarjeta">
        <h3>    1    -    3     -    6</h3>
        <h3>  Ingrese cantidad de cuotas</h3>
        <h3> <input id ="tarjeta" name="pagarTarjeta" type="number"></h3>
        <button id="" class="boton" type="submit">PAGAR</button>
    </form>
`
    const inputTarjeta = document.getElementById("tarjeta")
    const tarjeta = document.getElementById("pagarTarjeta")
    tarjeta.addEventListener("submit", (e) => {
        e.preventDefault();
        const pagarTarjeta = inputTarjeta.value;

        document.getElementById("cuerpoModal").innerHTML = `
        <h3>Desea pagar en  cuotas : 1 - 3 - 6 </h3>
        `
        let credito = pagarTarjeta;

        if (credito == 1) {

            total.toFixed(2) = total * 1.15;
            document.getElementById("cuerpoModal").innerHTML = `
                <h3>Su monto total a pagar es $ ${total.toFixed(2)}</h3>
                `
        } else if (credito == 3) {

            total = total * 1.25 / 3;
            document.getElementById("cuerpoModal").innerHTML = `
                <h3>Usted abonara en tres cuotas de : $ ${total.toFixed(2)}</h3>
                `
            resetear();
        } else if (credito == 6) {

            total = total * 1.40 / 6;
            document.getElementById("cuerpoModal").innerHTML = `
                <h3>Usted abonara en seis cuotas de : $ ${total.toFixed(2)}</h3>
       `
            resetear();
        } else {
            Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cantidad de cuotas no validas!',

                })
                // resetear();
            pagoTarjeta();
        }
    })
}


//resetea la tabla del dom
const resetear = () => {
    document.getElementById("total").innerHTML = `<h3> </h3>`
        //document.getElementById("limpiar").innerHTML = `<h6> </h6>`
        //document.getElementById("precio").innerHTML = `<h3> </h3>`




}


document.getElementById("cuerpoModal")
const divModal = document.createElement("div");
pedido.forEach((producto) => {
    divModal.innerHTML = `
        ${producto.nombre}
    
       `
})

// devuelve la compra al modal
divModal.append("cuerpoModal")
const modal = document.getElementById("botonModal")

// activa el boton del modal y llama tipo de pago
const activaModal = () => {
    modal.click();
    tipoDePago();
}

// cierra el modal y resetea el sistema

const cerrarModal = document.getElementById("cerrarModal")
cerrarModal.addEventListener('click', () => {
    ocultaBoton();
    // console.log("aca")
    //respaldo = [];
    total = 0;
    resetear();
    vaciaTabla();

})

//oculta el boton de total
const ocultaBoton = () => {
    document.getElementById("enviar").style.display = 'none';

}

const vaciaTabla = () => {
    const vacio = document.getElementById('tabla1')
    vacio.innerHTML = `<h4></h4>`
}