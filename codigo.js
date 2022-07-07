const carritoStorage = JSON.parse(localStorage.getItem('carrito')) //Verificamos si carrito esta en localstorage

let carrito = carritoStorage ? carritoStorage : []  //Si hay algo en el localstorage se agregara a carrito de lo contrario se inicia en vacio

// Creamos una class con los datos del producto
class Producto {
    constructor(id, nombre, foto, precio){
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.precio = precio
    }
}
// Si el array de carrito tiene objetos, se remueve la clase y empieza el contador

if(carrito.length > 0 ){
    cart.classList.remove('hidden')
    cart.innerHTML = carrito.length
    
}
// funcion para poder agregar los slider dinamicamente
sliders.map((slider, i) => {
    let div = document.createElement('div')
    if(i < 1) {
        div.className = 'carousel-item active'
        div.innerHTML = `<img src=${slider.foto} class="d-block w-100" alt=${slider.nombre}/>`
    }else{
        div.className = 'carousel-item'
        div.innerHTML = `<img src=${slider.foto} class="d-block w-100" alt=${slider.nombre}/>`
    }
    carouselInner.appendChild(div)
})

// funcion para poder agregar los productos dinamicamente usando fetch un json local
fetch('productos.json')
.then((resp) => resp.json())
.then((data) => {
    data.productos.map(producto => {
        let div = document.createElement('div')
        div.className = 'col col-md-3'
        div.innerHTML = `
        <div class="card h-100">
            <img src=${producto.foto} style="width:100%; height:250px" class="card-img-top" alt=${producto.nombre}>
            <div class="card-body">
                <h6 class="card-title">${producto.nombre} </h6> <span> $ ${producto.precio} </span>
                <div style="width: 100%" class= "d-flex justify-content-end py-1">
                    <button id="${producto.id}" type="button" class=" btnProductos btn btn-outline-primary">Agregar al carrito</button>
                </div>
            </div>
        </div>`
        productos.appendChild(div)
    })

    // por cada boton de agregar carrito, se genera un addEventListener y escribe de manera dinamica cuantos productos hay en el carrito
    for(const button of btn){ 
        button.addEventListener('click', (e) => {
            let productoEncontrado = data.productos.find(product => product.id == e.target.id)
            const nuevoProducto = new Producto(productoEncontrado.id, productoEncontrado.nombre, productoEncontrado.foto, productoEncontrado.precio)
            
            if(nuevoProducto){
                carrito.push(nuevoProducto)
            }

            if(carrito.length > 0 ){
                cart.classList.remove('hidden')
                cart.innerHTML = carrito.length
            }

            localStorage.setItem('carrito', JSON.stringify(carrito))

            Toastify({
                text: "Se agrego al carrito",
                gravity:'bottom',
                position: 'right',
                style: {
                    background: "linear-gradient(to right, red, yellow)",
                }
            }).showToast();
        })
    }
})

// escuchamos los eventos del button cart, si no hay nada en el carrito se muestra un mensaje al cliente
buttonCart.addEventListener('click', (e) => {
    if(carrito.length > 0){
        let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
        bsOffcanvas.show()
        showProductosEnCanvas()
    } else {
        Toastify({
            text: "No tiene productos seleccionados",
            gravity:'bottom',
            position: 'right',
            style: {
                background: "linear-gradient(to right, red, yellow)",
            }
        }).showToast();
    }
})
// Mostramos en el canvas nuestra lista de los productos que seleccionamos
function showProductosEnCanvas() {
       
        let result = carrito.reduce((prev, current) => {
            // Compruebo si ya existe el elemeento
            let exists = prev.find(x => x.nombre === current.nombre);
            // Si no existe lo creo con un array vacío en un objeto
            if (!exists) {
              const notExists = {nombre: current.nombre, foto: current.foto, cantidad: 1, precio: current.precio};
              prev.push(notExists);
            }
            // Si existe reemplazo la cantidad + 1
            if(exists){
                const datosActualizados = prev.map(prev =>{
                    return {nombre: prev.nombre, foto: prev.foto, cantidad: exists.nombre == prev.nombre ? prev.cantidad + 1 : prev.cantidad, precio: prev.precio}
                })
                prev = datosActualizados
            }
            // Devuelvo el array resultado para la nueva iteración
            return prev;
        }, []);
        // Se resetea de nuevo el innerHtml
        offCanvasCarrito.innerHTML=''
        let nuevoPrecio = 0 ;

        if( result.lenght === undefined) {
            precio.innerHTML = ''

        }

        // se hace el mapeo de result para dibujar mediante DOM la lista de los productos 
        result.map(producto => {
            let div = document.createElement('div')
            div.className = 'row'
            div.innerHTML = `
                <div class="col-3" style="margin-top:10px">
                    <img src=${producto.foto} style="width:40px; height:40px ; border-radius:30px" alt=${producto.nombre}>
                </div>
                <div class="col-7 d-flex justify-content-between align-items-center" style="font-size:16px">
                    <div> ${producto.nombre} </div>
                    <div> x ${producto.cantidad} </div>
                </div>
                <div id="${producto.nombre}" class="col-2 d-flex align-items-center" style="cursor:pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
            `
            offCanvasCarrito.appendChild(div)
            precio.innerHTML = 'El precio total ' + ( producto.cantidad * parseInt(producto.precio) +  nuevoPrecio)
            nuevoPrecio = producto.cantidad * parseInt(producto.precio) + nuevoPrecio

            let btnProductoNombre = document.getElementById(`${producto.nombre}`)

            btnProductoNombre.addEventListener('click', (e) => {
                e.preventDefault()
                let productoEliminado = carrito.filter(car => car.nombre != btnProductoNombre.id)
                carrito = []
                carrito.push(...productoEliminado)
                cart.innerHTML = carrito.length
                localStorage.setItem('carrito', JSON.stringify(carrito))
                showProductosEnCanvas()
            });
        })
}

// Escuchamos el evento click para finalizar la compra

finalizar.addEventListener('click', (e) => {
    e.preventDefault()
    if(carrito.length > 0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Muchas gracias por su compra',
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.removeItem('carrito')
        carrito = []
        cart.innerHTML = carrito.length
        cart.classList.add('hidden')
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay productos para comprar',
            showConfirmButton: false,
            timer: 1500
        })
        localStorage.removeItem('carrito')
        carrito = []
        cart.innerHTML = carrito.length
        cart.classList.add('hidden')
    }
})


// Escuchamos el evento del click de enviar el formulario 
enviar.addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Nos pondremos en contacto a la brevedad',
        showConfirmButton: false,
        timer: 1500
    })
})

