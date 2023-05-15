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

const getKeyName = async () => {
  const value = await chrome.storage.sync.get(["user_select"]).then((value) => {
    return value;
  });
  const getSelect = value.user_select;
  return Object.keys(getSelect)[0];
};

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("currency");
  const setElements = getKeyName().then((e) => {
    let blue = new Option("Blue", "usd_blue");
    let oficial = new Option("Oficial", "usd_of");
    let turista = new Option("Turista", "usd_tur");
    // Este sistema de colores y demas, no es el mas optimos pero.. it gets the job done
    const colores = {
      usd_of: "#3a8842",
      usd_blue: "#5a65c9",
      usd_tur: "#d68235",
    };
    const elementos = Object.keys(colores);
    select.appendChild(blue);
    select.appendChild(oficial);
    select.appendChild(turista);
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === e) {
        select.options[i].selected = true;
        for (let z = 0; z < elementos.length; z++) {
          if (elementos[z] === select.value) {
            select.style.color = colores[elementos[z]];
            break;
          }
        }
        break;
      }
    }
  });
});

document.getElementById("save").addEventListener("click", saveOptions);
