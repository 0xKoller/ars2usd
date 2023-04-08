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
  let anio = fechaHoraObj.getFullYear() % 100; // Obtiene los últimos dos dígitos del año
  // Obtener los componentes de la hora
  let horas = fechaHoraObj.getHours();
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

async function logData() {
  const response = await fetch(
    "https://dolar-api-argentina.vercel.app/v1/dolares/blue"
  );
  const usd = await response.json();
  let priceTag = document.querySelector(
    ".ui-pdp-price__second-line .andes-money-amount__fraction"
  );
  priceTag = quitarFormatoNumero(priceTag.innerHTML);
  priceTag = priceTag / usd.venta;
  const contenedor = document.querySelector(".ui-pdp-price__second-line");
  const elemento = document.createElement("span");
  elemento.style.color = "#999";
  elemento.style.marginLeft = "3px";
  elemento.innerHTML = `≈ U$D ${priceTag.toFixed(2)}`;
  contenedor.appendChild(elemento);

  let numero = obtenerMLA();

  const responseUp = await fetch(
    `https://api.mercadolibre.com/items?ids=${numero}`
  );
  const dataItem = await responseUp.json();
  if (dataItem[0].code != 404) {
    let fechaHora = dataItem[0].body.last_updated;
    let fecha = new Date(fechaHora.replace("Z", "")); // quita la 'Z' para evitar problemas con la zona horaria
    let fechaHoraSeparada = fechaHoraTextoASeparado(fecha);

    const subtitle = document.querySelector("div.ui-pdp-header__subtitle");
    subtitle.style.display = "flex";
    subtitle.style.flexDirection = "column";
    const lastUpdate = document.createElement("span");
    lastUpdate.style.flexDirection;
    lastUpdate.className = "ui-pdp-subtitle";
    lastUpdate.innerHTML = `Ult. Actualización: ${fechaHoraSeparada.fecha} - ${fechaHoraSeparada.hora}`;

    subtitle.appendChild(lastUpdate);
  }
}

logData();
