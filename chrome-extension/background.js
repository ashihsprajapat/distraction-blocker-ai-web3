// Initialize blocking state
let isEnabled = false;

// Load initial state
chrome.storage.sync.get(['isEnabled'], (result) => {
  if (result && result.isEnabled !== undefined) {
    isEnabled = result.isEnabled;
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggleBlocking') {
    isEnabled = message.isEnabled;
    // Send response back to popup
    sendResponse({ success: true });
  }
  return true; // Keep the message channel open for async response
});

// Block websites
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (!isEnabled) return;

  chrome.storage.sync.get(['blockedSites'], (result) => {
    if (!result || !result.blockedSites) return;
    
    const blockedSites = result.blockedSites;
    const url = new URL(details.url);
    const domain = url.hostname;

    if (blockedSites.some(site => domain.includes(site))) {
      // Redirect to block page
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL('blocked.html')
      });
    }
  });
}); 