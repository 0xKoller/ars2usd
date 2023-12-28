async function getValues() {
  try {
    let response = await fetch(
      "https://dolarapi.com/v1/dolares/blue"
    );
    const usdBlue = await response.json();
  chrome.storage.sync.set({ usd_blue: usdBlue.venta });
  chrome.storage.sync.set({ user_select: usdBlue.venta });
  chrome.storage.sync.set({currency: "usd_blue"})

  response = await fetch(
    "https://dolarapi.com/v1/dolares/oficial"
  );
  const usdOf = await response.json();
  chrome.storage.sync.set({ usd_of: usdOf.venta });

  response = await fetch(
    "https://dolarapi.com/v1/dolares/solidario"
  );
  const usdTur = await response.json();
  chrome.storage.sync.set({ usd_tur: usdTur.venta });
  } catch (error) {
    console.log(error);
  }
  
}

getValues();

self.addEventListener("activate", function () {
  setInterval(function () {
    getValues();
  }, 60 * 60 * 1000);
});
