const carritoStorage = JSON.parse(localStorage.getItem('carrito'))
let carrito = carritoStorage ? carritoStorage : []
if(carritoStorage && carrito.length > 0 ){
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
                <h6 class="card-title">${producto.nombre}</h6>
                <div style="width: 100%" class= "d-flex justify-content-end py-1">
                    <button id="${producto.id}" type="button" class="btn btn-outline-primary">Agregar al carrito</button>
                </div>
            </div>
        </div>`
        productos.appendChild(div)
    })
})

// por cada boton de agregar carrito, se genera un addEventListener y escribe de manera dinamica cuantos productos hay en el carrito

for(const button of btn){
    button.addEventListener('click', (e) => {
        let producto = stock.find(product => product.id == e.target.id)
        if(producto){
            carrito.push(producto)
        }
        if(carrito.length > 0 ){
            cart.classList.remove('hidden')
            cart.innerHTML = carrito.length
        }
        localStorage.setItem('carrito', JSON.stringify(carrito))
        Toastify({
            text: "Se agrego al carrito",
            gravity:'bottom',
            position: 'right'
          }).showToast();
    })
}

buttonCart.addEventListener('click', (e) => {
    if(carrito.length > 0){
        let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas)
        bsOffcanvas.show()
        let result = carrito.reduce((prev, current) => {
            // Compruebo si ya existe el elemeento
            let exists = prev.find(x => x.nombre === current.nombre);
            // Si no existe lo creo con un array vacío en un objeto
            if (!exists) {
              const notExists = {nombre: current.nombre, foto: current.foto, cantidad: 1};
              prev.push(notExists);
            }
            // Si existe reemplazo la cantidad + 1
            if(exists){
                const datosActualizados = prev.map(prev =>{
                    return {nombre: prev.nombre, foto: prev.foto, cantidad: exists.nombre == prev.nombre ? prev.cantidad + 1 : prev.cantidad}
                })
                prev = datosActualizados
            }
            // Devuelvo el array resultado para la nueva iteración
            return prev;
        }, []);

        result.map(producto => {
            let div = document.createElement('div')
            div.className = 'row'
            div.innerHTML = `
                <div class="col-6" style="margin-top:10px">
                    <img src=${producto.foto} style="width:100px; height:100px" alt=${producto.nombre}>
                </div>
                <div class="col-6 d-flex align-items-center" style="font-size:16px; font-weight:bold">
                    ${producto.nombre}
                    <span> X ${producto.cantidad} </span>
                </div>  
            `
            offCanvasCarrito.appendChild(div)
        })
    }
})
