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
      return { color: "5A65C9", text: "Blue" };
    case "usd_of":
      return { color: "3A8842", text: "Oficial" };
    case "usd_tur":
      return { color: "D68235", text: "Turista" };
  }
};

const span = document.getElementById("selected_currency");
const a = getKeyName().then((e) => {
  const values = getText(e);
  span.innerHTML = values.text;
  span.style.color = `#${values.color}`;
  span.style.fontWeight = "bold";
});
