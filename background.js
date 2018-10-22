const forEach = cb => arr => arr.forEach(cb)

function clearCookiesForTab (tab) {
  console.log(tab.url);
  const { protocol } = new URL(tab.url);
  chrome.cookies.getAll({ url: tab.url}, forEach(cookie => {
    chrome.cookies.remove({url: protocol + "//" + cookie.domain  + cookie.path, name: cookie.name});
  }));
}

const tabFilter = {
    url: [
      // TODO: Create UI for these host / url identifiers to be added
      { hostEquals: 'medium.com' },
      { hostEquals: 'www.slader.com' }
    ]
}

chrome.webNavigation.onBeforeNavigate.addListener(clearCookiesForTab, tabFilter);
chrome.webNavigation.onHistoryStateUpdated.addListener(clearCookiesForTab, tabFilter);
