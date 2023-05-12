async function getValues() {
  let response = await fetch(
    "https://dolar-api-argentina.vercel.app/v1/dolares/blue"
  );
  const usdBlue = await response.json();
  chrome.storage.local.set({ usd_blue: usdBlue.venta });

  response = await fetch(
    "https://dolar-api-argentina.vercel.app/v1/dolares/oficial"
  );
  const usdOf = await response.json();
  chrome.storage.local.set({ usd_of: usdOf.venta });

  response = await fetch(
    "https://dolar-api-argentina.vercel.app/v1/dolares/solidario"
  );
  const usdTur = await response.json();
  chrome.storage.local.set({ usd_tur: usdTur.venta });
}

getValues();
