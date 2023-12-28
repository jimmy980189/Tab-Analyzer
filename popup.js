document.getElementById('groupTabs').onclick = () => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const currentTab = tabs.find((tab) => tab.active);
    const tabsByOrigin = {};

    // Group tabs by origin
    tabs.forEach((tab) => {
      const tabOrigin = new URL(tab.url).origin;
      if (!tabsByOrigin[tabOrigin]) {
        tabsByOrigin[tabOrigin] = [tab];
      } else {
        tabsByOrigin[tabOrigin].push(tab);
      }
    });

    // Move tabs with the same origin together
    Object.values(tabsByOrigin).forEach((tabGroup) => {
      if (tabGroup.length > 1) {
        const firstTab = tabGroup[0];
        const newTabPosition = currentTab.index > 0 ? currentTab.index - 1 : 0;
        const newTabIndex = newTabPosition + tabs.findIndex((tab) => tab.id === firstTab.id);

        tabGroup.forEach((tab, index) => {
          chrome.tabs.move(tab.id, { index: newTabIndex + index });
        });
      }
    });
  });
};

/*
 *document.getElementById('getWindowTabs').onclick = () => {
 *  chrome.windows.getAll({ populate: true }, (windows) => {
 *    windows.forEach((window) => {
 *      console.log(`Window ID: ${window.id}, Number of Tabs: ${window.tabs.length}`);
 *    });
 *  });
 *};
 */

document.getElementById('getWindowTabs').onclick = () => {
  chrome.windows.getAll({ populate: true }, (windows) => {
    const windowInfoDiv = document.getElementById('windowInfo');
    windowInfoDiv.innerHTML = ''; // Clear previous content

    windows.forEach((window) => {
      const windowInfo = document.createElement('p');
      windowInfo.textContent = `Window ID: ${window.id}, Number of Tabs: ${window.tabs.length}`;
      windowInfoDiv.appendChild(windowInfo);
    });
  });
};

document.getElementById('moveToNewWindow').onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];

    chrome.windows.create({ tabId: currentTab.id }, (newWindow) => {
      console.log(`Tab moved to new window with ID: ${newWindow.id}`);
    });
  });
};

document.getElementById('countTabsByOrigin').onclick = () => {
  chrome.tabs.query({}, (tabs) => {
    const tabsByOrigin = {};

    tabs.forEach((tab) => {
      const tabOrigin = new URL(tab.url).origin;
      tabsByOrigin[tabOrigin] = (tabsByOrigin[tabOrigin] || 0) + 1;
    });

    const tabsByOriginDiv = document.getElementById('tabsByOriginInfo');
    tabsByOriginDiv.innerHTML = ''; // Clear previous content

    let totalOrigins = 0;

    Object.keys(tabsByOrigin).forEach((origin) => {
      const tabCountInfo = document.createElement('p');
      tabCountInfo.textContent = `Origin: ${origin}, Number of Tabs: ${tabsByOrigin[origin]}`;
      tabsByOriginDiv.appendChild(tabCountInfo);
      totalOrigins++;
    });

    const totalOriginsInfo = document.createElement('p');
    totalOriginsInfo.textContent = `Total Number of Origins: ${totalOrigins}`;
    tabsByOriginDiv.appendChild(totalOriginsInfo);
  });
};

document.getElementById('closeDuplicateTabs').onclick = () => {
  chrome.tabs.query({}, (tabs) => {
    const tabsByOrigin = {};

console.log(tabs);


/*
 *    tabs.forEach((tab) => {
 *      const tabOrigin = new URL(tab.url).origin;
 *      if (!tabsByOrigin[tabOrigin]) {
 *        tabsByOrigin[tabOrigin] = [tab.id];
 *      } else {
 *        tabsByOrigin[tabOrigin].push(tab.id);
 *      }
 *    });
 *
 *    Object.keys(tabsByOrigin).forEach((origin) => {
 *      const tabIds = tabsByOrigin[origin];
 *      if (tabIds.length > 1) {
 *        const tabsToClose = tabIds.slice(1); // Keep the first tab and close others
 *        chrome.tabs.remove(tabsToClose);
 *      }
 *    });
 *
 *    console.log('Duplicate tabs closed');
 */
  });
};
