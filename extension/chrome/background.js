let chromeBrowser = null;
let currentButton = null;
let currentTabId = null;
let selectedCredential = null;

// Listen for messages from the webpage
if (typeof browser !== 'undefined') {
  chromeBrowser = browser;
} else if (typeof chrome !== 'undefined') {
  chromeBrowser = chrome;
}

if(chromeBrowser) {
  chromeBrowser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(typeof(message) === 'string'){
      message = JSON.parse(message);
    }
    console.log('Message detected in Background Script');
    console.log(message);

    // Handle Messages from Wallet to SW
    if (message.action === 'PRESENT_VP') {
      selectedCredential = message.data;
    }

    // Handle Call from Content Script to SW
    else if (message.action === 'OPEN_ENKI_WALLET') {
      console.log('open wallet called');

      currentButton = message.data;
      currentTabId = sender.tab.id;

      //chromeBrowser.runtime.openPopup().then(() => {
      //  sendResponse({'OPENED'})
      //}).catch((e) => {
      //  sendResponse('FAILED_TO_OPEN', e)
      //});
      sendResponse({
        action: 'RETURNED_VC',
        data: selectedCredential,
        tab: currentTabId,
      });
    }
    return true
  });
}