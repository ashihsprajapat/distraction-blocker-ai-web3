document.addEventListener('DOMContentLoaded', () => {
  const statusElement = document.getElementById('status');
  const blockedSitesList = document.getElementById('blockedSitesList');
  const newSiteInput = document.getElementById('newSite');
  const addSiteButton = document.getElementById('addSite');
  const toggleBlockingButton = document.getElementById('toggleBlocking');

  // Load initial state
  chrome.storage.sync.get(['isEnabled', 'blockedSites'], (result) => {
    const isEnabled = result.isEnabled || false;
    updateUI(isEnabled, result.blockedSites || []);
  });

  // Toggle blocking
  toggleBlockingButton.addEventListener('click', () => {
    chrome.storage.sync.get(['isEnabled'], (result) => {
      const newState = !(result.isEnabled || false);
      chrome.storage.sync.set({ isEnabled: newState }, () => {
        updateUI(newState);
        // Notify background script
        chrome.runtime.sendMessage({ type: 'toggleBlocking', isEnabled: newState });
      });
    });
  });

  // Add new site
  addSiteButton.addEventListener('click', () => {
    const site = newSiteInput.value.trim();
    if (!site) return;

    chrome.storage.sync.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || [];
      if (!blockedSites.includes(site)) {
        blockedSites.push(site);
        chrome.storage.sync.set({ blockedSites }, () => {
          updateUI(null, blockedSites);
          newSiteInput.value = '';
        });
      }
    });
  });

  // Update UI
  function updateUI(isEnabled, blockedSites) {
    // Update status
    if (isEnabled !== null) {
      statusElement.textContent = isEnabled ? 'Active' : 'Inactive';
      statusElement.className = `status ${isEnabled ? 'active' : 'inactive'}`;
      toggleBlockingButton.textContent = isEnabled ? 'Disable Blocking' : 'Enable Blocking';
    }

    // Update blocked sites list
    if (blockedSites) {
      blockedSitesList.innerHTML = '';
      blockedSites.forEach(site => {
        const siteElement = document.createElement('div');
        siteElement.className = 'site-item';
        siteElement.innerHTML = `
          <span>${site}</span>
          <button class="delete" data-site="${site}">Delete</button>
        `;
        blockedSitesList.appendChild(siteElement);
      });

      // Add delete handlers
      document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', (e) => {
          const siteToDelete = e.target.dataset.site;
          chrome.storage.sync.get(['blockedSites'], (result) => {
            const blockedSites = result.blockedSites.filter(site => site !== siteToDelete);
            chrome.storage.sync.set({ blockedSites }, () => {
              updateUI(null, blockedSites);
            });
          });
        });
      });
    }
  }
}); 