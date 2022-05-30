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
                <button type="button" class="btn btn-outline-primary">Agregar al carrito</button>
            </div>
        </div>
    </div>`
    productos.appendChild(div)
})