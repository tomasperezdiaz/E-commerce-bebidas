let productos = [];

function obtenerInfo() {
  return new Promise((resolve, reject) => {
    fetch("./productos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar la API");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function main() {
  try {
    productos = await obtenerInfo(); // Elimina "const" para que se asigne a la variable global
    cargarProductos(productos);
  } catch (error) {
    console.error("Error en la app", error);
  }
}

main();

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".btn-men");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numero = document.querySelector("#numero");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = " ";
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

let productosCarritoJS = localStorage.getItem("producto-carrito");

if (productosCarritoJS) {
  productosCarrito = JSON.parse(productosCarritoJS);
  actualizarNumero();
} else {
  productosCarrito = [];
}

function agregarCarrito(e) {
  const idBtn = e.currentTarget.id;
  const productoAgregado = productos.find((producto) => producto.id === idBtn);

  const existeEnCarrito = productosCarrito.some((producto) => producto.id === idBtn);

  existeEnCarrito
    ? productosCarrito.find((producto) => producto.id === idBtn).cantidad++
    : (productoAgregado.cantidad = 1, productosCarrito.push(productoAgregado));

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
