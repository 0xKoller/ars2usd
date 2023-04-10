chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["scripts/content.js"],
  });
});

chrome.storage.local.set({ justUpdated: 1 });
