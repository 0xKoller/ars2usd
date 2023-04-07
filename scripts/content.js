function quitarFormatoNumero(numeroConFormato) {
  const strNumero = numeroConFormato.toString();
  const numeroSinFormato = strNumero.replace(/\D/g, "");
  const numero = Number(numeroSinFormato);
  return numero;
}

async function logData() {
  const response = await fetch(
    "https://dolar-api-argentina.vercel.app/v1/dolares/blue"
  );
  const usd = await response.json();
  let priceTag = document.querySelector(".andes-money-amount__fraction");
  priceTag = quitarFormatoNumero(priceTag.innerHTML);
  priceTag = priceTag / usd.venta;
  const contenedor = document.querySelector(".ui-pdp-price__second-line");
  const elemento = document.createElement("span");
  elemento.style.color = "#999";
  elemento.style.marginLeft = "3px";
  elemento.innerHTML = `≈ U$D ${priceTag.toFixed(2)}`;
  contenedor.appendChild(elemento);
}

logData();
