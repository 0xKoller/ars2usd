const saveOptions = async () => {
  const valueSelect = document.getElementById("currency").value;
  const value = await chrome.storage.sync
    .get([`${valueSelect}`])
    .then((value) => {
      return value;
    });
  chrome.storage.sync.set({ user_select: value });
  location.reload();
  chrome.tabs.reload();
};

document.getElementById("save").addEventListener("click", saveOptions);

const getKeyName = async () => {
  const value = await chrome.storage.sync.get(["user_select"]).then((value) => {
    return value;
  });
  const getSelect = value.user_select;
  const getKey = Object.keys(getSelect)[0];
  return getKey;
};

const getText = (currency) => {
  switch (currency) {
    case "usd_blue":
      return "Dolar Blue";
    case "usd_of":
      return "Dolar Oficial";
    case "usd_tur":
      return "Dolar Turista";
  }
};

const span = document.getElementById("selected_currency");
const a = getKeyName().then((e) => {
  span.innerHTML = getText(e);
});
