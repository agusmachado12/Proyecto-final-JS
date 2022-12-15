class Producto {
  constructor(id, nombre, img, precio) {
    this.id = id;
    this.nombre = nombre;
    this.img = img;
    this.precio = precio;
    this.cantidad = 1;
  }
}

const paleta1 = new Producto(1, "PALETA PADEL NOX NERBO WPT WORLD PADEL TOUR", "./imagenes/paleta-nox.png", 169999);
const paleta2 = new Producto(2, "PALETA PADEL ADIDAS METALBONE 3.1 CTRL PADDLE", "./imagenes/paleta-adidas.png", 149999);
const paleta3 = new Producto(3, "PALETA PADEL STARVIE RAPTOR 2021 PADDLE", "./imagenes/paleta-starvie.png", 126999);
const paleta4 = new Producto(4, "PALETA PADEL ENEBE RSX GRAPHENO EVA PADDLE", "./imagenes/paleta-nb.png", 89999);
const paleta5 = new Producto(5, "PALETA PADEL ROYAL EUROPE MASTER PRO CARBONO PADDLE", "./imagenes/paleta-royal.png", 79999);
const paleta6 = new Producto(6, "PALETA PADEL STEEL CUSTOM AIR BOSS CARBONO  STL FOAM", "./imagenes/paleta-stl.png", 69999);

const paletas = [paleta1, paleta2, paleta3, paleta4, paleta5, paleta6];

let carrito = [];

if(localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorPaletas = document.getElementById("contenedorPaletas");

  const misPaletas = () => {
    paletas.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col", "col-order-5", "col-order-1")
      card.innerHTML = `
          <div class="col">
              <h3 class="classTitle">${producto.nombre}</h3>
              <img src="${producto.img}" alt="" >
              <span class="logo-pesos">${producto.precio}</span>
              <div>
                  <button class="btn-paletas" id="btnPaletas${producto.id}">Agregar al carrito</button>
              </div>
            </div>
  `
    contenedorPaletas.appendChild(card);

    const btnPaletas = document.getElementById(`btnPaletas${producto.id}`);
    btnPaletas.addEventListener("click", () => {
      Toastify({
        text:"Producto agregado al carrito",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style:
        {
          background:"linear-gradient(to left, #fffff, #add8e6"
        }
        
      }).showToast();
        agregarAlCarrito(producto.id)
    })


    
  })
}

const agregarAlCarrito = (id) => {
  const producto = paletas.find((producto) => producto.id === id);
  const paletaEnCarrito = carrito.find((producto) => producto.id === id);
  if (paletaEnCarrito) {
    paletaEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  calculoTotal();
}

misPaletas();

const containerCarrito = document.getElementById("containerCarrito");

const productoCarrito = document.getElementById("productoCarrito");

productoCarrito.addEventListener("click", () => {
  productosEnCarrito();
})

const productosEnCarrito = () => {
  containerCarrito.innerHTML="";
  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col, col, col");
    card.innerHTML = `
    <div class="col">
              <h3 class="classTitle">${producto.nombre}</h3>
              <img src="${producto.img}" alt="" >
              <span class="logo-pesos">${producto.precio}</span>
              <p> ${producto.cantidad}</p>
              <div>
                  <button class="btn-paletas" id="eliminarProductos${producto.id}">Vaciar carrito</button>
              </div>
            </div>
    `
    containerCarrito.appendChild(card);

    const btnPaletas = document.getElementById(`eliminarProductos${producto.id}`);
    btnPaletas.addEventListener("click", () => {
      
      eliminarDelCarrito(producto.id);
    })
  })
  calculoTotal();
}

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  productosEnCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarTodoCarrito = () => {
  carrito = [];
  productosEnCarrito();

  localStorage.clear();

}
const btnVaciar = document.getElementById("btnVaciar");

btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: 'Estas seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Vaciar carrito'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Eliminado!',
        'Producto eliminado',
        'success'
      )
    }
  })
  
  eliminarDelCarrito();
})

const total = document.getElementById("total");

const calculoTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio *producto.cantidad;
  })
  total.innerHTML = `$${totalCompra}`
}































  
    