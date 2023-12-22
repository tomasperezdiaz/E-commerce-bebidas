
let productosCarritos = localStorage.getItem("producto-carrito");
productosCarritos = JSON.parse(productosCarritos);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoCompra = document.querySelector("#carrito-compra");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const borrarTodo = document.querySelector("#carrito-accion-vaciar");
const total = document.querySelector("#total");
const btnComprar = document.querySelector("#btn-compra");
function productosCar() {
  if (productosCarritos && productosCarritos.length > 0) {
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.remove("disabled");
    carritoAcciones.classList.remove("disabled");
    carritoCompra.classList.add("disabled");

    carritoProductos.innerHTML = " ";

    productosCarritos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("carrito-producto");
      div.innerHTML = `<img class="carrito-producto-imagen" src="${
        producto.img
      }" alt="${producto.titulo}" />
      <div class="carrito-producto-titulo">
        <small>Titulo</small>
        <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
          <small>Cantidad</small>
          <p>${producto.cantidad}</p>
           </div>
          <div class="carrito-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
             </div>
            <div class="carrito-producto-subtotal">
              <small>Subtotal</small>
              <p>$${producto.precio * producto.cantidad}</p>
               </div>
              <button class="carrito-producto-eliminar" id="${producto.id}">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                  />
                </svg>
              </button>`;
      carritoProductos.append(div);
    });
  } else {
    carritoVacio.classList.remove("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoCompra.classList.add("disabled");
  }
  actualizarBtnElimnar();
  totale();
}
productosCar();

function actualizarBtnElimnar() {
  botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", borrar);
  });
}

function borrar(e) {
  const idBtn = e.currentTarget.id;
  const index = productosCarritos.findIndex(
    (producto) => producto.id === idBtn
  );
  productosCarritos.splice(index, 1);
  productosCar();

  localStorage.setItem("producto-carrito", JSON.stringify(productosCarritos));
}

borrarTodo.addEventListener("click", borrarTodos);
function borrarTodos() {
  productosCarritos.length = 0;
  localStorage.setItem("producto-carrito", JSON.stringify(productosCarritos));
  productosCar();
}

function totale() {
  const totalSuma = productosCarritos.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  total.innerText = `$${totalSuma}`;
}



btnComprar.addEventListener("click", compraCarrito)
function compraCarrito() {
  Toastify({
    text: "Gracias por tu compra",
    className: "info",
    style: {
      background: "orange",
    }
  }).showToast();
  borrarTodos();
  localStorage.clear();
}