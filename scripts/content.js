function quitarFormatoNumero(numeroConFormato) {
  const strNumero = numeroConFormato.toString();
  const numeroSinFormato = strNumero.replace(/\D/g, "");
  return Number(numeroSinFormato);
}

function fechaHoraTextoASeparado(fechaHoraTexto) {
  let fechaHoraObj = new Date(fechaHoraTexto);
  let dia = fechaHoraObj.getDate();
  let mes = fechaHoraObj.getMonth() + 1;
  let anio = ("0" + (fechaHoraObj.getFullYear() % 100)).slice(-2);
  let horas = fechaHoraObj.getHours();
  horas -= 3;
  if (horas < 0) {
    horas += 24;
  }
  let minutos = fechaHoraObj.getMinutes();
  let fechaSeparada =
    ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + anio.toString();
  let horaSeparada = ("0" + horas).slice(-2) + ":" + ("0" + minutos).slice(-2);

  return { fecha: fechaSeparada, hora: horaSeparada };
}

function obtenerMLA() {
  let url = window.location.href;
  let regex = /(MLA-?\d+)/g;
  let matches = url.match(regex);
  if (matches && matches.length > 0) {
    let mla = matches[0].replace(/[-]/g, "");
    return mla;
  } else {
    return "null";
  }
}

function formateoNumero(numeroSinFormato) {
  return numeroSinFormato.toLocaleString();
}

function separarTextoPorPipe(texto) {
  const separador = "|";
  const indicePipe = texto.indexOf(separador);
  if (indicePipe !== -1) {
    const cadena1 = texto.substring(0, indicePipe).trim();
    const cadena2 = texto.substring(indicePipe + separador.length).trim();
    return [cadena1, cadena2];
  }
  return [texto.trim(), ""]; // Si no se encuentra el separador, devuelve el texto completo en la primera cadena y una cadena vacía en la segunda.
}

function unidadesVendidasReales(unidadFicticia, unidadReal) {
  const tachada = document.createElement("p");
  tachada.innerText = unidadFicticia;
  tachada.style.textDecoration = "line-through";
  const nuevo = document.createElement("span");
  nuevo.innerText = unidadReal;
  return `${tachada} ${nuevo}`;
}

async function logData() {
  // Get USD price
  const value = await chrome.storage.sync.get().then((value) => {
    return value.user_select;
  });
  const usd = value;

  let priceTag = document.querySelector(
    ".ui-pdp-price__second-line .andes-money-amount__fraction"
  );
  if (priceTag != null) {
    priceTag = quitarFormatoNumero(priceTag.innerHTML);
    priceTag = priceTag / usd;

    // Select container
    const contenedor = document.querySelector(".ui-pdp-price__second-line");

    // Create element
    const elemento = document.createElement("span");
    elemento.classList.add("tooltip");
    elemento.innerHTML = `≈ U$D ${priceTag.toFixed(2)}`;
    contenedor.appendChild(elemento);

    // Icono
    const icon = document.createElement("div");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>`;
    icon.classList.add("icon");
    elemento.appendChild(icon);

    // Tooltip para saber el dolar que se toma
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip-text");
    tooltip.innerHTML = `$${usd}`;
    icon.appendChild(tooltip);
  }
  
    
}

function styling() {
  // Cant. Elementos Carrito
  const numCart = document.querySelector("span.nav-icon-cart-quantity");
  numCart.style.top = "-3px";

  // Nombre user y pic
  const user = document.querySelector("span.nav-header-usermenu-wrapper");
  // user.style.alignItems = "center";

  // Barra de opciones del user
  const userOptions = document.querySelector("nav#nav-header-menu");
  userOptions.style.alignItems = "center";

  // Pin location
  const pin = document.querySelector(".nav-bounds");

  // Promo card
  const promo = document.querySelector(".ui-search-item__ad-label--blue");
}

// Estilos enchanced ✨
styling();

// Este timeout es necesario debido a que MeLi no devuelve la pagina cargada del todo
// sino que carga progresivamente, por ende se estima que en 1seg ya termino de cargar
// bloquear la carga por completo evitaria que obtenga notificaciones y demas.
setTimeout(function () {
  logData();
}, 500);
