const saveOptions = async () => {
  const valueSelect = document.getElementById("currency").value;
  const value = await chrome.storage.sync
    .get([`${valueSelect}`])
    .then((value) => {
      return value;
    });
  chrome.storage.sync.set({ currency: `${Object.keys(value)}` });
  chrome.storage.sync.set({ user_select: value[`${Object.keys(value)}`] });
  location.reload();
  chrome.tabs.reload();
};

const getKeyName = async () => {
  const value = await chrome.storage.sync.get().then((value) => {
    return value.currency;
  });
  return value;
};

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("currency");
  const colores = {
    usd_of: "#3a8842",
    usd_blue: "#5a65c9",
    usd_tur: "#d68235",
  };
  const elementos = Object.keys(colores);
  getKeyName().then((e) => {
    const options = [
      { label: "Blue", value: "usd_blue" },
      { label: "Oficial", value: "usd_of" },
      { label: "Tarjeta", value: "usd_tur" },
    ];
    options.forEach((option) => {
      const { label, value } = option;
      select.appendChild(new Option(label, value));
    });
    select.value = e;
    elementos.forEach((elemento) => {
      if (elemento === select.value) {
        select.style.color = colores[elemento];
        return;
      }
    });
  });
});

document.getElementById("save").addEventListener("click", saveOptions);
