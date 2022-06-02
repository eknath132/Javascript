let carrito = []

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
// funcion para poder agregar los productos dinamicamente
stock.map(producto => {
    let div = document.createElement('div')
    div.className = 'col col-md-3'
    div.innerHTML = `
    <div class="card h-100">
        <img src=${producto.foto} style="width:100%; height:250px" class="card-img-top" alt=${producto.nombre}>
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <div style="width: 100%" class= "d-flex justify-content-end">
                <button id="${producto.id}" type="button" class="btn btn-outline-primary">Agregar al carrito</button>
            </div>
        </div>
    </div>`

    productos.appendChild(div)
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
    })
}
