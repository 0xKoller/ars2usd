function addMostSelled() {
  const contenedor = document.querySelector("ul.nav-menu-list");
  const elemento = document.createElement("li");
  elemento.className = "nav-menu-item";
  const link = document.createElement("a");
  link.className = "nav-menu-item-link";
  link.setAttribute("href", "https://www.mercadolibre.com.ar/mas-vendidos");
  link.innerHTML = "+ Vendidos";
  elemento.appendChild(link);
  contenedor.appendChild(elemento);
}

addMostSelled();
