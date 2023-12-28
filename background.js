// Keep the same as before
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'moveTabLeft') {
    // Same logic as before
  }
});

