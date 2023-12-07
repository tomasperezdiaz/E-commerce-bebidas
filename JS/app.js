const productos = [
  //Cervezas
  {
    id: "cerveza-ipa",
    titulo: "Cerveza IPA",
    img: "./img/cervezaIpa.jpg",
    categoria: { id: "cerveza", nombre: "Cerveza" },
    precio: 500,
  },
  {
    id: "cerveza-rubia",
    titulo: "Cerveza rubia",
    img: "./img/cervezaRubia.jpg",
    categoria: { id: "cerveza", nombre: "Cerveza" },
    precio: 520,
  },
  {
    id: "cerveza-roja",
    titulo: "Cerveza roja",
    img: "./img/cervezaRoja.jpg",
    categoria: { id: "cerveza", nombre: "Cerveza" },
    precio: 550,
  },
  {
    id: "cerveza-negra",
    titulo: "Cerveza negra",
    img: "./img/cervezaNegra.jpg",
    categoria: { id: "cerveza", nombre: "Cerveza" },
    precio: 600,
  },
  //Vinos
  {
    id: "vino-malbec",
    titulo: "Vino Malbec",
    img: "./img/vinoMalbec.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 1000,
  },
  {
    id: "vino-toro",
    titulo: "Vino Toro",
    img: "./img/vinoToro.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 330,
  },
  {
    id: "vino-trapiche",
    titulo: "Vino Trapiche",
    img: "./img/vinoTrapiche.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 990,
  },
  {
    id: "vino-ysefue ",
    titulo: "Vino Ysefue",
    img: "./img/vinoSeFue.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 1200,
  },
  {
    id: "vino-malbec-especial",
    titulo: "Vino Malbec Especial",
    img: "./img/vinoMalvecEspecial.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 1500,
  },
  {
    id: "vino-toro-premium",
    titulo: "Vino Premium",
    img: "./img/vinoToroPremium.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 340,
  },
  {
    id: "vino-trapiche-export",
    titulo: "Vino Trapiche Export",
    img: "./img/vinoTrapicheExport.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 1220,
  },
  {
    id: "vino-sefue-yvolvio ",
    titulo: "Vino Sefue Yvolvio",
    img: "./img/vinoSeFueyVolvio.jpg",
    categoria: { id: "vino", nombre: "Vino" },
    precio: 12000,
  },
  //Bebidas Blancas
  {
    id: "fernet-branca",
    titulo: "Fernet Branca",
    img: "./img/fernet.jpg",
    categoria: { id: "bebida-blanca", nombre: "Bebida Blanca" },
    precio: 10200,
  },
  {
    id: "vodka",
    titulo: "Vodka",
    img: "./img/vodka.jpg",
    categoria: { id: "bebida-blanca", nombre: "Bebida Blanca" },
    precio: 3340,
  },
  {
    id: "tequilla",
    titulo: "Tequilla",
    img: "./img/tequilla.jpg",
    categoria: { id: "bebida-blanca", nombre: "Bebida Blanca" },
    precio: 9290,
  },
  {
    id: "ron",
    titulo: "Ron",
    img: "./img/ron.jpg",
    categoria: { id: "bebida-blanca", nombre: "Bebida Blanca" },
    precio: 12030,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-men");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";
  productosElegidos.map((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `  <div class="producto">
    <img class="producto-imagen" src="${producto.img}" alt="${producto.titulo} " />
    <div class="producto-detalles">
      <h3 class="producto-titulo">${producto.titulo} </h3>
      <p class="producto-precio">$ ${producto.precio} </p>
      <button class="producto-agregar"id="${producto.id}" >Agregar</button></div>
    </div>'
    `;
    contenedorProductos.append(div);
  });
  actualizarBtn();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("activo"));
    e.currentTarget.classList.add("activo");
    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;
      const productosBtn = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBtn);
    } else {
      tituloPrincipal.innerText = "Todas las bebidas";
      cargarProductos(productos);
    }
  });
});

function actualizarBtn() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
}

let productosCarrito;

let productosCarritoJS = localStorage.getItem("producto-carrito")


if (productosCarritoJS) {
  productosCarrito = JSON.parse(productosCarritoJS) ;
  actualizarNumero();
} else {
  productosCarrito = [];
}

function agregarCarrito(e) {
  const idBtn = e.currentTarget.id;
  const productoAgregado = productos.find((producto) => producto.id === idBtn);

  if (productosCarrito.some((producto) => producto.id === idBtn)) {
    const index = productosCarrito.findIndex(
      (producto) => producto.id === idBtn
    );
    productosCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosCarrito.push(productoAgregado);
  }
  actualizarNumero();

  localStorage.setItem("producto-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumero() {
  let numeroNuevo = productosCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numero.innerText = numeroNuevo;
}
