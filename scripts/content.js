function quitarFormatoNumero(numeroConFormato) {
  const strNumero = numeroConFormato.toString();
  const numeroSinFormato = strNumero.replace(/\D/g, "");
  const numero = Number(numeroSinFormato);
  return numero;
}

function fechaHoraTextoASeparado(fechaHoraTexto) {
  // Convertir la fecha y hora de texto a un objeto Date
  let fechaHoraObj = new Date(fechaHoraTexto);
  // Obtener los componentes de la fecha
  let dia = fechaHoraObj.getDate();
  let mes = fechaHoraObj.getMonth() + 1; // Los meses en JavaScript empiezan en 0 (enero)
  let anio = ("0" + (fechaHoraObj.getFullYear() % 100)).slice(-2);
  // Obtener los componentes de la hora
  let horas = fechaHoraObj.getHours();
  horas -= 3;
  if (horas < 0) {
    horas += 24;
  }
  let minutos = fechaHoraObj.getMinutes();
  // Unir los componentes en un string con separadores "/"
  let fechaSeparada =
    ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + anio.toString();
  // Unir los componentes de la hora en un string con separadores ":"
  let horaSeparada = ("0" + horas).slice(-2) + ":" + ("0" + minutos).slice(-2);
  // Devolver un objeto que contenga tanto la fecha como la hora separadas

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

async function logData() {
  const response = await fetch(
    "https://dolar-api-argentina.vercel.app/v1/dolares/blue"
  );
  const usd = await response.json();
  let priceTag = document.querySelector(
    ".ui-pdp-price__second-line .andes-money-amount__fraction"
  );
  if (priceTag != null) {
    priceTag = quitarFormatoNumero(priceTag.innerHTML);
    priceTag = priceTag / usd.venta;

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
    tooltip.innerHTML = `$${usd.venta}`;
    icon.appendChild(tooltip);
  }

  let numero = obtenerMLA();
  if (numero != "null") {
    const responseUp = await fetch(
      `https://api.mercadolibre.com/items?ids=${numero}`
    );
    const dataItem = await responseUp.json();

    if (dataItem[0].code != 404) {
      let fechaHora = dataItem[0].body.last_updated;
      let fecha = new Date(fechaHora.replace("Z", "")); // quita la 'Z' para evitar problemas con la zona horaria
      let fechaHoraSeparada = fechaHoraTextoASeparado(fecha);
      // Containter Vend+Act.
      const subtitle = document.querySelector("div.ui-pdp-header__subtitle");

      // Last Updt
      const lastUpdate = document.createElement("span");
      lastUpdate.className = "ui-pdp-subtitle";
      lastUpdate.innerHTML = `Ult. Actualización: ${fechaHoraSeparada.fecha} - ${fechaHoraSeparada.hora}`;
      subtitle.appendChild(lastUpdate);

      const responseSeller = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?seller_id=${dataItem[0].body.seller_id}`
      );
      const dataSeller = await responseSeller.json();
      console.log(dataSeller);
      // Container seller
      const box = document.querySelector(".ui-seller-info");
      const sellerPlus = document.createElement("div");
      sellerPlus.classList.add("seller-plus");
      const seller_name = document.createElement("div");
      seller_name.classList.add("seller-name");
      seller_name.innerHTML = `<p  class="data-title">Nombre</p><p> ${dataSeller.seller.nickname}</p>
      
      `;
      const seller_loc = document.createElement("div");
      seller_loc.classList.add("seller-name");
      seller_loc.innerHTML = `<p  class="data-title">Ubicación</p><p> ${dataItem[0].body.seller_address.city.name}, ${dataItem[0].body.seller_address.state.name}</p>`;

      const seller_registered = document.createElement("div");
      seller_registered.classList.add("seller-name");
      const seller_registered_date = fechaHoraTextoASeparado(
        dataSeller.seller.registration_date
      );
      seller_registered.innerHTML = `<p>Registrado desde el ${seller_registered_date.fecha} a las ${seller_registered_date.hora}</p>`;

      const periodo = dataSeller.seller.seller_reputation.metrics.sales.period;

      const historic = document.createElement("div");
      historic.classList.add("data");
      const per_claim =
        (dataSeller.seller.seller_reputation.metrics.claims.value * 100) /
        dataSeller.seller.seller_reputation.metrics.sales.completed;
      const per_cancelled_period =
        (dataSeller.seller.seller_reputation.metrics.cancellations.value *
          100) /
        dataSeller.seller.seller_reputation.metrics.sales.completed;

      const per_completed =
        (dataSeller.seller.seller_reputation.transactions.completed * 100) /
        dataSeller.seller.seller_reputation.transactions.total;
      const per_cancelled =
        (dataSeller.seller.seller_reputation.transactions.canceled * 100) /
        dataSeller.seller.seller_reputation.transactions.total;
      historic.innerHTML = `
    <p class="data-title"> Estadísticas de ${periodo.replace(/\D/g, "")} días
    </p>
    <div class="historic-container">
      <div class="year">
      <div>
      <p class="data-name">Ventas: <p class="data-value">${formateoNumero(
        dataSeller.seller.seller_reputation.metrics.sales.completed
      )}</p></p>
      </div>
      <div>
      <p class="data-name">Reclamos: <p class="data-value">${formateoNumero(
        dataSeller.seller.seller_reputation.metrics.claims.value
      )}</p>
      <p class="data-value-sub"> ≈ ${per_claim.toFixed(2)}
      %
      </p>
      </p>
      </div>
      <div>
      <p class="data-name">Cancelaciones: <p class="data-value">${formateoNumero(
        dataSeller.seller.seller_reputation.metrics.cancellations.value
      )}</p>
      <p class="data-value-sub"> ≈ ${per_cancelled_period.toFixed(2)}
      %
      </p>
      </p>
    </div>
      </div>

    </div>
    <p class="data-title"> Histórico
    </p>
    <div class="historic-container">
      <div class="all-time"><div>
      <p class="data-name">Transac. Realizadas: <p class="data-value">${formateoNumero(
        dataSeller.seller.seller_reputation.transactions.total
      )}</p></p>
      </div>
      <div>
      <p class="data-name">Transac. Completadas: <p class="data-value">${formateoNumero(
        dataSeller.seller.seller_reputation.transactions.completed
      )}</p>
      <p class="data-value-sub"> ≈ ${per_completed.toFixed(2)}
      %
      </p>
      </p>
      </div>
      <div>
      <p class="data-name">Transac. Canceladas: <p class="data-value">${formateoNumero(
        dataSeller.seller.seller_reputation.transactions.canceled
      )}</p>
      <p class="data-value-sub"> ≈ ${per_cancelled.toFixed(2)}
      %
      </p>
      </p>
    </div>
    </div>
    `;

      box.appendChild(sellerPlus);
      sellerPlus.appendChild(seller_name);
      sellerPlus.appendChild(seller_loc);
      sellerPlus.appendChild(historic);
      sellerPlus.appendChild(seller_registered);
    }
  }
}

function styling() {
  // Cant. Elementos Carrito
  const numCart = document.querySelector("span.nav-icon-cart-quantity");
  numCart.style.top = "-3px";

  // Nombre user y pic
  const user = document.querySelector("span.nav-header-usermenu-wrapper");
  user.style.alignItems = "center";

  // Barra de opciones del user
  const userOptions = document.querySelector("nav#nav-header-menu");
  userOptions.style.alignItems = "center";

  // Pin location
  const pin = document.querySelector(".nav-bounds");

  // Pagination
  const pagination = document.querySelector(".andes-pagination");
}

// Estilos enchanced ✨
styling();

// Este timeout es necesario debido a que MeLi no devuelve la pagina cargada del todo
// sino que carga progresivamente, por ende se estima que en 1seg ya termino de cargar
// bloquear la carga por completo evitaria que obtenga notificaciones y demas.
setTimeout(function () {
  logData();
}, 500);
